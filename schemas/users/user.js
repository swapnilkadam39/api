import database from "../../databaseConfig/config.js";
import auth from "../../auth/auth.js";
import roles from "../roles/role.js";
import { v4 as uuidv4 } from "uuid";

function getRoleDetails(result) {
  return {
    id: result?.role_id,
    name: result?.role_name,
    description: result?.description,
    created_at: result?.role_created_at,
    updated_at: result?.role_updated_at,
    user_id: result.user_id,
  };
}

async function fetchUser(filter, orQuery) {
  const query = database("users")
    .join("roles", "users.role_id", "roles.id")
    .select(
      "users.id",
      "users.name",
      "users.mobile",
      "users.email",
      "users.gender",
      "users.created_at",
      "users.updated_at",
      "users.is_active",
      "users.password",
      "roles.name as role_name",
      "roles.id as role_id",
      "roles.created_at as role_created_at",
      "roles.updated_at as role_updated_at",
      "roles.description",
      "roles.user_id"
    )
    .where(filter);
  if (orQuery) query.orWhere(orQuery);

  const result = await query.first();
  if (!result) return null;
  result.role = getRoleDetails(result);
  return result;
}

async function insertUser(params) {
  return database("users").insert(params);
}

const users = {
  createUser: async function (req, inputUser) {
    let user = await fetchUser(
      { "users.email": inputUser.email },
      { "users.mobile": inputUser.mobile }
    );
    if (user) throw new Error("Email or mobile already exist.");

    if (
      !inputUser.email ||
      !inputUser.mobile ||
      !inputUser.password ||
      !inputUser.gender ||
      !inputUser.name
    )
      throw new Error("Please send all the required fields.");

    inputUser.role_id = (await roles.getRoleByName("users")).id;
    inputUser.id = uuidv4();
    inputUser.created_at = new Date();
    inputUser.updated_at = new Date();
    inputUser.is_active = true;
    await insertUser(inputUser);
    let result = await fetchUser({ "users.id": inputUser.id }, false);
    delete result.password;
    result.auth_token = auth.generateToken(result);
    return result;
  },
  login: async function (req, email, password) {
    let user = await fetchUser({ "users.email": email }, false);
    if (!user || user?.password != password) {
      throw new Error("Entered incorrect email or password.");
    }

    delete user.password;
    user.auth_token = auth.generateToken(user);
    return user;
  },
  getUser: async function (req, id) {
    if (!req?.user?.id || (req?.user?.id != id && req?.user?.role != "super")) {
      throw new Error("You are not authorised to access this.");
    }
    let user = await fetchUser({ "users.id": id }, false);
    delete user.password;
    return user;
  },
  getUsers: async function (req, roleName) {
    if (req?.user?.role != "super")
      throw new Error("You are not authorised to access this.");
    const query = database("users")
      .join("roles", "users.role_id", "roles.id")
      .select(
        "users.id",
        "users.name",
        "users.mobile",
        "users.email",
        "users.gender",
        "users.created_at",
        "users.updated_at",
        "users.is_active",
        "roles.name as role_name",
        "roles.id as role_id",
        "roles.created_at as role_created_at",
        "roles.updated_at as role_updated_at",
        "roles.description"
      );

    if (roleName) {
      query.where("roles.name", roleName);
    }
    const result = await query;
    return result.map((row) => ({
      ...row,
      role: {
        id: row.role_id,
        name: row.role_name,
        description: row.description,
        created_at: row.role_created_at,
        updated_at: row.role_updated_at,
      },
    }));
  },
};
export default users;

import database from "../../databaseConfig/config.js";
import { v4 as uuidv4 } from "uuid";

async function insertRole(params) {
  params.id = uuidv4();
  params.created_at = new Date();
  params.updated_at = new Date();
  return database("roles").insert(params);
}

async function updateRoleDetails(params) {
  params.updated_at = new Date();
  return database("roles").where({ id: params.id }).update(params);
}

const roles = {
  getRoles: async function (req) {
    if (req?.user?.role != "super")
      throw new Error("You are not authorised to access this.");
    return database("roles").select("*");
  },
  getRole: async function (req, id) {
    if (req?.user?.role != "super")
      throw new Error("You are not authorised to access this.");
    return database("roles").where("id", id).first();
  },
  getRoleByName: async function (roleName) {
    return database("roles").where("name", roleName).first();
  },
  createRole: async function (req, input) {
    if (req?.user?.role != "super")
      throw new Error("You are not authorised to access this.");

    let role = await this.getRoleByName(input.name);
    if (role?.id) throw new Error("Role name already exist.");

    input.user_id = req.user.id;
    await insertRole(input);

    return database("roles").where("id", input.id).first();
  },
  updateRole: async function (req, input) {
    if (req?.user?.role != "super")
      throw new Error("You are not authorised to access this.");

    let role = await this.getRole(req, input.id);
    if (!role?.id) throw new Error("Role not found.");

    input.user_id = req.user.id;
    await updateRoleDetails(input);

    return database("roles").where("id", input.id).first();
  },
};
export default roles;

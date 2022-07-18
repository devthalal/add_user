import { shared } from "node-blox-sdk";
import { getBody } from "./utils.js";

const add_user = async (req, res) => {
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({ success: true, msg: "Health check success" }));
    res.end();
  }

  // Getting shared prisma client
  const { prisma, validate } = await shared.getShared();

  const data = await getBody(req);

  const user_validate_schema = {
    type: "object",
    properties: {
      first_name: { type: "string" },
      salutation: { type: "string" },
      middle_name: { type: "string" },
      last_name: { type: "string" },
      email: { type: "string", format: "email" },
    },
    required: ["first_name", ""],
    additionalProperties: true,
  };
  const error = validate(user_validate_schema, data);

  if (error !=  null) {
    res.status(400);
    res.write(
      JSON.stringify({
        success: false,
        msg: `User validation error`,
        data: error,
      })
    );
    res.end();
    return;
  }

  const dbRes = await prisma.user.create({
    data: data,
  });

  res.write(
    JSON.stringify({
      success: true,
      msg: `User added succesfully`,
      data: dbRes,
    })
  );
  res.end();
};

export default add_user;

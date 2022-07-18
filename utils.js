/**
 * Function to format and send response
 * @param {*} res
 * @param {*} code
 * @param {*} data
 * @param {*} type
 */
export const sendResponse = (res, code, data, type = "application/json") => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    "Content-Type": type,
  };

  res.writeHead(code, headers);
  res.write(JSON.stringify(data));
  res.end();
};

/**
 * Function to extract the body from the request
 * @param {*} req
 * @returns
 */
export const getBody = async (req) => {
  const bodyBuffer = [];
  for await (const chunk of req) {
    bodyBuffer.push(chunk);
  }
  const data = Buffer.concat(bodyBuffer).toString();
  return JSON.parse(data || "{}");
};


exports.handler = async (event) => {
  console.log(event);
  const todoId = event.pathParameters.todoId;
  const todo = {
    todoId: todoId,
    todoName: "Todo " + todoId,
  };
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(todo),
  };
  return response;
};

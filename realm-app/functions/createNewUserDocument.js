exports = async function createNewUserDocument({user}) {
  const cluster = context.services.get("mongodb-atlas");
  const users = cluster.db("sample_mflix").collection("users");
  return users.insertOne({
    _id: user.id,
    _partition: `user=${user.id}`,
    name: user.data.email,
    canReadPartitions: [`user=${user.id}`],
    canWritePartitions: [`project=${user.id}`],
    memberOf: [
      {"name": "My Project", "_partition": `_partition`}
    ],
  });
};
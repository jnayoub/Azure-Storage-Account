
async function editFileAdmin(req, res) {
  console.log("editFile called");
  console.log(req.body);
  const adminPassword = req.body.adminPassword;
  const fileID = req.body.fileID;
  try {
    console.log(adminPassword, fileID);
  } catch (error) {
    console.error("Error with fileadmin", error);
    res.status(500).send("Error with file admin endpoint");
  }
}

module.exports = editFileAdmin;

app.post("/api/createPost", async (req, res, next) => {
  // incoming: caption, video, imagesArray, userId
  // outgoing: error

  const { caption, video, imagesArray, creatorId } = req.body;
  const postComments = [];
  const dateCreated = new Date().toISOString();

  const newPost = {
    creatorId: creatorId,
    caption: caption,
    NumberOfLikes: 0,
    NumberOfComments: 0,
    NumberOfShares: 0,
    PostComments: postComments,
    Video: video,
    Images: imagesArray,
    DateCreated: dateCreated,
  };
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const result = db.collection("Posts").insertOne(newPost);
  } catch (e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

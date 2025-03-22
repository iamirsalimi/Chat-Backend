const NamespaceModel = require("./../models/Chat");

exports.getAll = async (req, res, next) => {
  try {
    const namespaces = await NamespaceModel.find({}, { room: 0 });
    return res.json(namespaces);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, href } = req.body;

    const namespace = await NamespaceModel.findOne({
      $or: [{ title }, { href }],
    });

    if (namespace) {
      return res
        .status(400)
        .json({ message: "There is namespace with this info !!" });
    }

    await NamespaceModel.create({ title, href });
    return res
      .status(201)
      .json({ message: "New namespace created successfully :))" });
  } catch (err) {
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { title, namespace } = req.body;
    let image = null;

    const mainNamespace = await NamespaceModel.findOne({ href: namespace });

    if (!mainNamespace) {
      return res.status(400).json({ message: "Namespace not found !!" });
    }

    const mainRoom = await NamespaceModel.findOne({ "rooms.title": title });
    if (mainRoom) {
      return res.status(400).json({ message: "Room already exist !!" });
    }

    if (req.file) {
      image = `rooms/${req.file.filename}`;
    }

    const room = { title, image: image ? image : undefined };

    await NamespaceModel.findOneAndUpdate(
      { href: namespace },
      {
        $push: {
          rooms: room,
        },
      }
    );

    return res
      .status(201)
      .json({ message: "New Room created successfully :))" });
  } catch (err) {
    next(err);
  }
};

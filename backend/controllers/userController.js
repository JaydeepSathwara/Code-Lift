const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const bcrypt_secret = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userCheck = await User.findOne({ email });
  try {
    if (userCheck) {
      return res.status(400).json({ 'errorMessage': "Email Is Already In Use" });
    }
    const UserData = await User.create({
      name, email, password: bcrypt.hashSync(password, bcrypt_secret)
    })
    jwt.sign({ name, email, id: UserData._id }, process.env.JWT_SECREAT, {}, (err, token) => {
      if (err) throw err;
      const userDetails = {
        name: name,
        email: email,
      };
      return res.cookie('token', token).json(userDetails);
    });
  } catch (e) {
    console.log(e);
    return res.status(422).json(e);
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userCheck = await User.findOne({ email }).select('+password');
  try {
    if (userCheck) {
      const pwdCheck = bcrypt.compareSync(password, userCheck.password);
      if (pwdCheck) {
        jwt.sign({ name: userCheck.name, email: userCheck.email, id: userCheck._id, profile_image: userCheck.profile_image }, process.env.JWT_SECREAT, {}, (err, token) => {
          if (err) throw err;
          const userDetails = {
            name: userCheck.name,
            email: userCheck.email,
            profile_image: userCheck.profile_image,
            id: userCheck.id
          };
          return res.status(200).cookie('token', token).json(userDetails);
        })
      } else {
        res.status(400).json({ 'errorMessage': "Incorrect Email Or Password" });
      }
    } else {
      res.status(400).json({ 'errorMessage': "Email Not Found. Register If Don't Have Account" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
}

exports.getUserProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECREAT, {}, (err, user) => {
      if (err) throw err;
      console.log("userDetailsasdasdasd123", user);
      res.json(user);
    });
  } else {
    res.json(null);
  }
}
exports.logoutUser = async (req, res) => {
  res.cookie('token', '').json(true);
}

// exports.editUserProfile = async (req, res) => {
//   const { name, email, id } = req.body;
//   console.log("asdasdasd", id);
//   const userData = await User.findOne({ email });
// }

// exports.editUserProfile = async (req, res) => {
//   const { name } = req.body;
//   const { token } = req.cookies;

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECREAT, async (err, user) => {
//       if (err) throw err;

//       const email = user.email;
//       const id = user.id;

//       try {
//         const updatedUserData = await User.findOneAndUpdate(
//           { email },
//           { $set: { name } },
//           { new: true }
//         );

//         if (updatedUserData) {
//           console.log("updatedUserData.name", updatedUserData.name);
//           const updatedName = updatedUserData.name;
//           console.log("updatedNameupdatedNameupdatedName", updatedName);
//           jwt.sign({ name: updatedName, email, id }, process.env.JWT_SECREAT, {}, (err, token) => {
//             if (err) throw err;
//             const userDetails = {
//               name: updatedName,
//               email: updatedUserData.email,
//             };
//             return res.cookie('token', token).json(userDetails);
//           });
//           console.log("asdasdasd", updatedUserData);
//           return res.json(updatedUserData);
//         } else {
//           return res.status(404).json({ errorMessage: "User not found" });
//         }
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ errorMessage: "Oops, something went wrong!" });
//       }
//     });
//   } else {
//     res.json(null);
//   }
// };

exports.editUserProfile = async (req, res) => {
  const { name } = req.body;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECREAT, async (err, user) => {
      if (err) throw err;

      const email = user.email;
      const id = user.id;

      try {
        const updatedUserData = await User.findOneAndUpdate(
          { email },
          { $set: { name } },
          { new: true }
        );

        if (updatedUserData) {
          const updatedName = updatedUserData.name;

          jwt.verify(token, process.env.JWT_SECREAT, {}, (err, user) => {
            if (err) throw err;
            const OldUserToken = user;
            console.log("OldUserToken", OldUserToken);

            jwt.sign(
              {
                name: updatedName,
                email: OldUserToken.email,
                id: OldUserToken.id,
                profile_image: OldUserToken.profile_image,
              },
              process.env.JWT_SECREAT,
              {},
              (err, newToken) => {
                if (err) throw err;
                const userDetails = {
                  name: updatedName,
                  email: updatedUserData.email,
                  id: OldUserToken.id,
                  profile_image: OldUserToken.profile_image,
                };
                res.cookie('token', newToken).json(userDetails);
              }
            );
          });
        } else {
          return res.status(404).json({ errorMessage: "User not found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMessage: "Oops, something went wrong!" });
      }
    });
  } else {
    res.json(null);
  }
};



exports.profileImgUpload = async (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = filePath + '.' + ext;
    fs.renameSync(filePath, newPath);
    const uploadedFilename = newPath.replace('uploads/', '');
    const uploadedFileBaseName = path.basename(newPath);

    const { token } = req.cookies;

    if (token) {
      jwt.verify(token, process.env.JWT_SECREAT, async (err, user) => {
        if (err) throw err;
        const name = user.name;
        const email = user.email;
        const id = user.id;
        const old_profile = user.profile_image

        try {
          const updatedUserProfile = await User.findOneAndUpdate(
            { email },
            { $set: { profile_image: uploadedFileBaseName } },
            { new: true }
          );

          if (old_profile && old_profile != "default_profile_pic") {
            const oldImagePath = 'public/uploads/' + old_profile;
            fs.unlinkSync(oldImagePath);
          }

          if (updatedUserProfile) {
            jwt.sign({ name, email, id, profile_image: uploadedFileBaseName }, process.env.JWT_SECREAT, {}, (err, token) => {
              if (err) throw err;
              const userDetails = {
                name: updatedUserProfile.name,
                email: updatedUserProfile.email,
                id: updatedUserProfile.id,
                userProfile: updatedUserProfile.profile_image
              };
              return res.cookie('token', token).json(userDetails);
            });
          }
        }
        catch (error) {
          return res.status(500).json({ errorMessage: "Oops, something went wrong!" });
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: "Oops, Server Error!" });
  }
}

exports.profileImgRemove = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (token) {
      jwt.verify(token, process.env.JWT_SECREAT, async (err, user) => {
        if (err) throw err;
        const name = user.name;
        const email = user.email;
        const id = user.id;
        const old_profile = user.profile_image
        try {
          const updatedUserProfile = await User.findOneAndUpdate(
            { email },
            { $set: { profile_image: "default_profile_pic" } },
            { new: true }
          );

          if (old_profile) {
            const oldImagePath = 'public/uploads/' + old_profile;
            fs.unlinkSync(oldImagePath);
          }

          if (updatedUserProfile) {
            jwt.sign({ name, email, id, profile_image: "default_profile_pic" }, process.env.JWT_SECREAT, {}, (err, token) => {
              if (err) throw err;
              const userDetails = {
                name: updatedUserProfile.name,
                email: updatedUserProfile.email,
                id: updatedUserProfile.id,
                userProfile: "default_profile_pic"
              };
              return res.cookie('token', token).json(userDetails);
            });
          }
        }
        catch (error) {
          return res.status(500).json({ errorMessage: "Oops, something went wrong!" });
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: "Oops, Server Error!" });
  }
}
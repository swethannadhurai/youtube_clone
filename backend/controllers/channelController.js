
import { Channel } from "../models/channelModel.js";
import { newUser } from "../models/userModel.js";
import { Video } from "../models/videoModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// Create a new channel
export const createChannel = asyncHandler(async (req, res) => {
  const { name, handle } = req.body;
  const userId = req.user._id;

  const user = await newUser.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  if (user.hasChannel) throw new ApiError(400, "User already has a channel");

  const avatar = "https://res.cloudinary.com/dpdwl1tsu/image/upload/v1733578739/egt2sufg3qzyn1ofws9t_xvfn00.jpg";
  const banner = "https://res.cloudinary.com/dpdwl1tsu/image/upload/v1733578478/dlekdyn1dep7gevz9zyn.avif";

  const channel = await Channel.create({ name, handle, owner: userId, avatar, banner });

  user.hasChannel = true;
  user.channelId = channel._id;
  await user.save();

  res.status(201).json(new ApiResponse(201, channel, "Channel created successfully"));
});

// Get channel details
export const getChannel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const channel = await Channel.findById(id).populate("owner", "-password");
  if (!channel) throw new ApiError(404, "Channel not found");

  res.status(200).json(new ApiResponse(200, channel, "Channel fetched successfully"));
});

// Update channel details
export const updateChannel = asyncHandler(async (req, res) => {
  const { name, handle, description } = req.body;

  let bannerName, avatarName;

  if (req.files?.banner?.[0]) {
    const bannerPath = req.files.banner[0].path;
    bannerName = await uploadOnCloudinary(bannerPath);
  }

  if (req.files?.avatar?.[0]) {
    const avatarPath = req.files.avatar[0].path;
    avatarName = await uploadOnCloudinary(avatarPath);
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (handle) updateData.handle = handle;
  if (description) updateData.description = description;
  if (bannerName) updateData.banner = bannerName.url;
  if (avatarName) updateData.avatar = avatarName.url;

  const channel = await Channel.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
  if (!channel) throw new ApiError(404, "Channel not found");

  res.status(200).json(new ApiResponse(200, channel, "Channel updated successfully"));
});

// Subscribe to channel
export const subscribeToChannel = asyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const userId = req.user._id;

  const channel = await Channel.findById(channelId);
  if (!channel) throw new ApiError(404, "Channel not found");

  if (channel.subscribers.includes(userId))
    throw new ApiError(400, "Already subscribed");

  channel.subscribers.push(userId);
  await channel.save();

  const user = await newUser.findById(userId);
  if (!user.subscriptions.includes(channelId)) {
    user.subscriptions.push(channelId);
    await user.save();
  }

  res.status(200).json(new ApiResponse(200, channel, "Subscribed successfully"));
});

// Unsubscribe from channel
export const unsubscribeFromChannel = asyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const userId = req.user._id;

  const channel = await Channel.findById(channelId);
  if (!channel) throw new ApiError(404, "Channel not found");

  if (!channel.subscribers.includes(userId))
    throw new ApiError(400, "Not subscribed to this channel");

  channel.subscribers = channel.subscribers.filter(
    (sub) => sub.toString() !== userId.toString()
  );
  await channel.save();

  const user = await newUser.findById(userId);
  user.subscriptions = user.subscriptions.filter(
    (subId) => subId.toString() !== channelId.toString()
  );
  await user.save();

  res.status(200).json(new ApiResponse(200, channel, "Unsubscribed successfully"));
});

// Delete a channel
export const deleteChannel = asyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const userId = req.user._id;

  const channel = await Channel.findById(channelId).populate("videos");
  if (!channel) throw new ApiError(404, "Channel not found");

  if (channel.owner.toString() !== userId.toString())
    throw new ApiError(403, "You are not authorized to delete this channel");

  const videoIds = channel.videos?.map((video) => video._id) || [];
  await Video.deleteMany({ _id: { $in: videoIds } });

  await newUser.updateMany(
    { subscriptions: channelId },
    { $pull: { subscriptions: channelId } }
  );

  await newUser.updateMany(
    { likes: { $in: videoIds } },
    { $pull: { likes: { $in: videoIds } } }
  );

  await channel.deleteOne();

  const user = await newUser.findById(userId);
  if (user) {
    user.hasChannel = false;
    user.channelId = null;
    await user.save();
  }

  res.status(200).json(new ApiResponse(200, {}, "Channel and associated data deleted successfully"));
});

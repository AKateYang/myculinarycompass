import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/utils/helper.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';

class VideoTab extends StatelessWidget {
  const VideoTab({Key? key}) : super(key: key);

  static const String backendUrl =
      'https://myculinarycompass-0c8901cce626.herokuapp.com/assets';

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future:
          fetchVideoUrls(), // Replace with your API call to fetch video URLs
      builder: (context, AsyncSnapshot<List<String>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('No videos available.'));
        } else {
          List<String> videoUrls = snapshot.data!;

          return GridView.builder(
            itemCount: videoUrls.length,
            gridDelegate:
                SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.all(2.0),
                child: VideoWidget(
                  videoUrl: Uri.parse('$backendUrl/${videoUrls[index]}'),
                ),
              );
            },
          );
        }
      },
    );
  }
}

class VideoWidget extends StatefulWidget {
  final Uri videoUrl;

  const VideoWidget({required this.videoUrl, Key? key}) : super(key: key);

  @override
  _VideoWidgetState createState() => _VideoWidgetState();
}

class _VideoWidgetState extends State<VideoWidget> {
  late VideoPlayerController _videoPlayerController;
  late ChewieController _chewieController;
  bool autoplay = false; // Track autoplay state

  @override
  void initState() {
    super.initState();
    _videoPlayerController = VideoPlayerController.network(
      widget.videoUrl.toString(),
    );
    _chewieController = ChewieController(
      videoPlayerController: _videoPlayerController,
      aspectRatio: 4 / 3,
      autoInitialize: true,
      looping: true,
      autoPlay: autoplay,
      showControls: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          // Toggle autoplay on tap
          autoplay = !autoplay;
          _chewieController = ChewieController(
            videoPlayerController: _videoPlayerController,
            aspectRatio: 4 / 3,
            autoInitialize: true,
            looping: true,
            autoPlay: autoplay,
            showControls: false,
          );
        });
      },
      child: Chewie(
        controller: _chewieController,
      ),
    );
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController.dispose();
    super.dispose();
  }
}

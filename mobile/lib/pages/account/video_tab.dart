import 'package:flutter/material.dart';
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
                  videoUrl: '$backendUrl/${videoUrls[index]}',
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
  final String videoUrl;

  const VideoWidget({required this.videoUrl, Key? key}) : super(key: key);

  @override
  _VideoWidgetState createState() => _VideoWidgetState();
}

class _VideoWidgetState extends State<VideoWidget> {
  late VideoPlayerController _videoPlayerController;
  late ChewieController _chewieController;

  @override
  void initState() {
    super.initState();
    _videoPlayerController = VideoPlayerController.network(widget.videoUrl);
    _chewieController = ChewieController(
      videoPlayerController: _videoPlayerController,
      aspectRatio: 16 / 9, // Adjust the aspect ratio based on your videos
      autoInitialize: true,
      looping: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Chewie(controller: _chewieController);
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController.dispose();
    super.dispose();
  }
}

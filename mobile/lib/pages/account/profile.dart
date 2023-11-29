import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:mobile/pages/account/image_tab.dart';
import 'package:mobile/pages/account/liked_tab.dart';
import 'package:mobile/pages/account/post_tab.dart';
import 'package:mobile/pages/account/video_tab.dart';
import 'package:mobile/pages/landing/homepage.dart';
import 'package:mobile/utils/helper.dart';
import 'package:mobile/widgets/round_button.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<String> _userNameFuture;
  late Future<List<String>> _postsFuture;
  late Future<Map<String, dynamic>> _followFuture;
  late Future<String> _profileImageUrlFuture;

  @override
  void initState() {
    super.initState();
    _userNameFuture = fetchUserName();
    _postsFuture = fetchPosts();
    _followFuture = fetchUserFollow();
    _profileImageUrlFuture = fetchProfileImgUrl();
  }

  static const String backendUrl = 'http://www.myculinarycompass.com/assets';

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        body: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(top: 50, bottom: 20),
              child: FutureBuilder<String>(
                future: _profileImageUrlFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else {
                    String imageUrl = snapshot.data!;
                    return CircleAvatar(
                      radius: 50.0,
                      backgroundImage: NetworkImage('$backendUrl/$imageUrl'),
                    );
                  }
                },
              ),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.only(bottom: 20),
                child: FutureBuilder<String>(
                  future: _userNameFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return CircularProgressIndicator();
                    } else if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      String userName = snapshot.data!;
                      return Column(
                        children: [
                          Text(
                            userName,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 24,
                            ),
                          )
                        ],
                      );
                    }
                  },
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(bottom: 35),
              child: FutureBuilder<Map<String, dynamic>>(
                future: _followFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else {
                    var data = snapshot.data!;
                    var followers = data['currentUserFollowers'];
                    var following = data['currentUserFollowing'];

                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: [
                            Text(
                              "Followers",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            Text("$followers"),
                          ],
                        ),
                        Column(
                          children: [
                            Text(
                              "Following",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            Text("$following"),
                          ],
                        ),
                        RoundedButton(
                          backgroundColor: Colors.white,
                          textColor: Colors.black,
                          onPressed: () {
                            Get.offAll(() => const HomePage());
                            print('Edit Profile Button Pressed!');
                          },
                          text: 'Log out',
                        ),
                      ],
                    );
                  }
                },
              ),
            ),
            TabBar(
              tabs: [
                Tab(
                  icon: Icon(Icons.photo_camera),
                ),
                Tab(
                  icon: Icon(Icons.video_collection_rounded),
                ),
                // Tab(
                //   icon: Text(
                //     "Liked",
                //     style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                //   ),
                // ),
                Tab(
                  icon: Text(
                    "Posts",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
              ],
            ),
            Expanded(
              child: TabBarView(
                children: [
                  ImageTab(),
                  VideoTab(),
                  // LikedTab(),
                  PostTab(),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

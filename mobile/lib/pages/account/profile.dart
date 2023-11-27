import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:mobile/pages/account/image_tab.dart';
import 'package:mobile/pages/account/liked_tab.dart';
import 'package:mobile/pages/account/post_tab.dart';
import 'package:mobile/pages/account/video_tab.dart';
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

  @override
  void initState() {
    super.initState();
    _userNameFuture = fetchUserName();
    _postsFuture = fetchPosts();
    _followFuture = fetchUserFollow();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        body: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(top: 50, bottom: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: 100,
                    width: 100,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      shape: BoxShape.circle,
                    ),
                  ),
                ],
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
                            // Handle button press
                            print('Edit Profile Button Pressed!');
                          },
                          text: 'Edit Profile',
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
                Tab(
                  icon: Text(
                    "Liked",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
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
                  LikedTab(),
                  PostTab(),
                ],
              ),
            )
          ],
        ),
      ),
    );

    // return MaterialApp(
    //   theme: ThemeData.dark(),
    //   home: Scaffold(
    //     appBar: AppBar(
    //       title: Text('Your Username'),
    //       actions: [
    //         IconButton(
    //           icon: Icon(Icons.settings),
    //           onPressed: () {
    //             // Navigate to settings page
    //           },
    //         ),
    //       ],
    //     ),
    //     body: FutureBuilder(
    //       future: Future.wait([_userNameFuture, _postsFuture]),
    //       builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
    //         if (snapshot.connectionState == ConnectionState.waiting) {
    //           return Center(
    //             child: CircularProgressIndicator(),
    //           );
    //         } else if (snapshot.hasError) {
    //           return Center(
    //             child: Text('Error: ${snapshot.error}'),
    //           );
    //         } else {
    //           String userName = snapshot.data![0] as String;
    //           List<String> posts = snapshot.data![1] as List<String>;

    //           return SingleChildScrollView(
    //             child: Column(
    //               crossAxisAlignment: CrossAxisAlignment.start,
    //               children: [
    //                 // Profile Information Section
    //                 Padding(
    //                   padding: const EdgeInsets.all(16.0),
    //                   child: Row(
    //                     children: [
    //                       CircleAvatar(
    //                         radius: 50.0,
    //                         backgroundImage:
    //                             AssetImage('assets/profile_picture.jpg'),
    //                       ),
    //                       SizedBox(width: 16.0),
    //                       Column(
    //                         crossAxisAlignment: CrossAxisAlignment.start,
    //                         children: [
    //                           Text(
    //                             userName,
    //                             style: TextStyle(
    //                               fontSize: 18.0,
    //                               fontWeight: FontWeight.bold,
    //                             ),
    //                           ),
    //                           SizedBox(height: 4.0),
    //                           Text(
    //                             'Your Bio or Description',
    //                             style: TextStyle(
    //                               color: Colors.grey,
    //                             ),
    //                           ),
    //                         ],
    //                       ),
    //                     ],
    //                   ),
    //                 ),
    //                 // Divider
    //                 Divider(thickness: 0.5, color: Colors.grey),
    //                 // Post Section
    //                 Padding(
    //                   padding: const EdgeInsets.all(16.0),
    //                   child: Column(
    //                     crossAxisAlignment: CrossAxisAlignment.start,
    //                     children: [
    //                       Text(
    //                         'Posts',
    //                         style: TextStyle(
    //                           fontSize: 18.0,
    //                           fontWeight: FontWeight.bold,
    //                         ),
    //                       ),
    //                       SizedBox(height: 8.0),
    //                       // Replace with your grid of images or posts
    //                       GridView.builder(
    //                         shrinkWrap: true,
    //                         physics: NeverScrollableScrollPhysics(),
    //                         gridDelegate:
    //                             SliverGridDelegateWithFixedCrossAxisCount(
    //                           crossAxisCount: 3,
    //                           crossAxisSpacing: 8.0,
    //                           mainAxisSpacing: 8.0,
    //                         ),
    //                         itemCount: posts.length,
    //                         itemBuilder: (context, index) {
    //                           return Container(
    //                             decoration: BoxDecoration(
    //                               image: DecorationImage(
    //                                 image: AssetImage(posts[index]),
    //                                 fit: BoxFit.cover,
    //                               ),
    //                             ),
    //                           );
    //                         },
    //                       ),
    //                     ],
    //                   ),
    //                 ),
    //               ],
    //             ),
    //           );
    //         }
    //       },
    //     ),
    //   ),
    // );
  }
}

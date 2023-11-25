import 'package:flutter/material.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:mobile/widgets/round_button.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<String> _userNameFuture;
  late Future<List<String>> _postsFuture;

  @override
  void initState() {
    super.initState();
    _userNameFuture = fetchUserName();
    _postsFuture = fetchPosts();
  }

  Future<String> fetchUserName() async {
    await Future.delayed(Duration(seconds: 2));
    return 'Your Full Name';
  }

  Future<List<String>> fetchPosts() async {
    await Future.delayed(Duration(seconds: 2));
    return List.generate(
        9, (index) => '../backend/public/assets/post$index.jpeg');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(60.0),
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
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Column(
                  children: [
                    Text(
                      "Followers",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
                    ),
                    Text("num data"),
                  ],
                ),
                Column(
                  children: [
                    Text(
                      "Followers",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
                    ),
                    Text("num data"),
                  ],
                ),
                RoundedButton(
                  backgroundColor: const Color.fromARGB(255, 34, 34, 34),
                  onPressed: () {
                    // Handle button press
                    print('Button Pressed!');
                  },
                  text: 'Edit Profile',
                ),
              ],
            ),
          )
        ],
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

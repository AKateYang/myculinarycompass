import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/pages/newfeed.dart';
import 'package:mobile/pages/account/profile.dart';
import 'package:mobile/pages/saved.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _currentIndex = 1;

  void _navigate(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  // All the pages
  final List _pages = [
    //dashboard
    ProfilePage(),

    NewsFeedPage(),

    SavedRecipes(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.transparent,
        // appBar: AppBar(
        //   elevation: 0,
        //   backgroundColor: Colors.white,
        //   title: const Text(
        //     "My Culinary Compass",
        //     style: TextStyle(
        //         fontSize: 28, fontWeight: FontWeight.bold, color: Colors.black),
        //   ),
        //   centerTitle: true,
        //   systemOverlayStyle: SystemUiOverlayStyle.dark,
        // ),
        bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: _navigate,
            items: [
              BottomNavigationBarItem(
                icon: Icon(Icons.person),
                label: "Profile",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.dashboard_rounded),
                label: "Dashboard",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.food_bank_rounded),
                label: "SavedRecipe",
              ),
            ]),
        body: _pages[_currentIndex]
        // This is an example that displays the stored name using a Future Builder
        // body: SafeArea(
        //   child: FutureBuilder(
        //     future: getUserProfile(),
        //     builder: (context, snapshot) {
        //       if (snapshot.hasData) {
        //         return Center(
        //           child: Column(
        //             mainAxisAlignment: MainAxisAlignment.center,
        //             children: [
        //               Text(snapshot.data!.user.firstName,
        //                   style: const TextStyle(fontSize: 24)),
        //               Text(snapshot.data!.user.lastName,
        //                   style: const TextStyle(fontSize: 24)),
        //             ],
        //           ),
        //         );
        //       } else {
        //         return const Center(
        //           child: CircularProgressIndicator(),
        //         );
        //       }
        //     },
        //   ),
        // ),
        );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/pages/newfeed.dart';
import 'package:mobile/pages/account/profile.dart';
import 'package:mobile/pages/saved.dart';
import 'package:mobile/pages/grocery.dart';

import 'utils/helper.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _currentIndex = 1;

  void navigate(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  // All the pages
  final List _pages = [
    //dashboard
    ProfilePage(),

    News(),

    SavedRecipes(),

    ShoppingListScreen(),
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
            onTap: navigate,
            items: [
              BottomNavigationBarItem(
                icon: Icon(Icons.person),
                label: "Profile",
                backgroundColor: Colors.green,
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.dashboard_rounded),
                label: "Dashboard",
                backgroundColor: Colors.green,
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.food_bank_rounded),
                label: "SavedRecipe",
                backgroundColor: Colors.green,
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.local_grocery_store_rounded),
                label: "Groceries",
                backgroundColor: Colors.green,
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

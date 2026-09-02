// import { Ionicons } from '@expo/vector-icons';
// import { Slot, usePathname, useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//     Animated,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     ImageBackground,
//     View,
// } from 'react-native';

// const NAV_ITEMS = [
//   { name: 'index', label: 'Hymns', icon: 'book-outline', activeIcon: 'book', route: '/' },
//   { name: 'explore', label: 'Favorites', icon: 'heart-outline', activeIcon: 'heart', route: '/explore' },
//   { name: 'about', label: 'About', icon: 'information-circle-outline', activeIcon: 'information-circle', route: '/about' },
// ];

// export default function TabsLayout() {
//   return (
// <ImageBackground
//       source={require('@/assets/images/bg.png')}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <Slot />
//       <FloatingNavMenu />
//     </ImageBackground>
//   );
// }

// function FloatingNavMenu() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isExpanded, setIsExpanded] = useState(false)
//   const widthAnim = useRef(new Animated.Value(56)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;

//   const handleExpand = () => {
//     setIsExpanded(true);
//     Animated.parallel([
//       Animated.spring(widthAnim, {
//         toValue: 280,
//         friction: 8,
//         tension: 50,
//         useNativeDriver: false,
//       }),
//       Animated.timing(opacityAnim, {
//         toValue: 1,
//         duration: 180,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const handleCollapse = () => {
//     Animated.parallel([
//       Animated.timing(opacityAnim, {
//         toValue: 0,
//         duration: 120,
//         useNativeDriver: true,
//       }),
//       Animated.spring(widthAnim, {
//         toValue: 56,
//         friction: 8,
//         tension: 50,
//         useNativeDriver: false,
//       }),
//     ]).start(() => setIsExpanded(false));
//   };

//   return (
//     <View style={styles.overlayContainer} pointerEvents="box-none">
//       <TouchableWithoutFeedback
//         onPressIn={handleExpand}
//         //@ts-ignore - Web hover handlers support
//         onMouseEnter={handleExpand}
//         onMouseLeave={handleCollapse}
//       >
//         <Animated.View style={[styles.floatingBar, { width: widthAnim }]}>
//           {!isExpanded ? (
//             <View style={styles.triggerContainer}>
//               <Ionicons name="compass" size={24} color="#FFFFFF" />
//             </View>
//           ) : (
//             <Animated.View style={[styles.menuRow, { opacity: opacityAnim }]}>
//               {NAV_ITEMS.map((item) => {
//                 const isActive = pathname === item.route;

//                 return (
//                   <TouchableOpacity
//                     key={item.name}
//                     style={[styles.navButton, isActive && styles.activeNavButton]}
//                     onPress={() => router.replace(item.route as any)}
//                     activeOpacity={0.7}
//                   >
//                     <Ionicons
//                       name={isActive ? (item.activeIcon as any) : (item.icon as any)}
//                       size={18}
//                       color={isActive ? '#8B0000' : '#6E6E73'}
//                     />
//                     <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
//                       {item.label}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </Animated.View>
//           )}
//         </Animated.View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundImage:"url('./assets/images/bg.png')",
//   },
//   overlayContainer: {
//     position: 'absolute',
//     bottom: 24,
//     right: 10,
//     alignItems: 'center',
//     zIndex: 9999,
//   },
//   floatingBar: {
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(230, 230, 230, 0.8)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     elevation: 8,
//     overflow: 'hidden',
//     justifyContent: 'center',
//   },
//   triggerContainer: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#8B0000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   menuRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     paddingHorizontal: 6,
//     width: '100%',
//   },
//   navButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 14,
//     gap: 6,
//   },
//   activeNavButton: {
//     backgroundColor: '#FFF5F5',
//   },
//   navLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#6E6E73',
//   },
//   activeNavLabel: {
//     color: '#8B0000',
//     fontWeight: '700',
//   },
// });


import { Ionicons } from '@expo/vector-icons';
import { Slot, usePathname, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const NAV_ITEMS = [
  { name: 'index', label: 'Hymns', icon: 'book-outline', activeIcon: 'book', route: '/' },
  { name: 'explore', label: 'Favorites', icon: 'heart-outline', activeIcon: 'heart', route: '/explore' },
  { name: 'about', label: 'About', icon: 'information-circle-outline', activeIcon: 'information-circle', route: '/about' },
];

export default function TabsLayout() {
  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={styles.container}
      resizeMode="contain"
    >
      <Slot />
      <FloatingNavMenu />
    </ImageBackground>
  );
}

function FloatingNavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const widthAnim = useRef(new Animated.Value(56)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleExpand = () => {
    setIsExpanded(true);
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: 280,
        friction: 8,
        tension: 50,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCollapse = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(widthAnim, {
        toValue: 56,
        friction: 8,
        tension: 50,
        useNativeDriver: false,
      }),
    ]).start(() => setIsExpanded(false));
  };

  return (
    <View style={styles.overlayContainer} pointerEvents="box-none">
      <TouchableWithoutFeedback
        onPressIn={handleExpand}
        //@ts-ignore - Web hover handlers support
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}
      >
        <Animated.View style={[styles.floatingBar, { width: widthAnim }]}>
          {!isExpanded ? (
            <View style={styles.triggerContainer}>
              <Ionicons name="compass" size={24} color="#FFFFFF" />
            </View>
          ) : (
            <Animated.View style={[styles.menuRow, { opacity: opacityAnim }]}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.route;

                return (
                  <TouchableOpacity
                    key={item.name}
                    style={[styles.navButton, isActive && styles.activeNavButton]}
                    onPress={() => router.replace(item.route as any)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isActive ? (item.activeIcon as any) : (item.icon as any)}
                      size={18}
                      color={isActive ? '#8B0000' : '#6E6E73'}
                    />
                    <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 24,
    right: 10,
    alignItems: 'center',
    zIndex: 9999,
  },
  floatingBar: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  triggerContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
    width: '100%',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 6,
  },
  activeNavButton: {
    backgroundColor: '#FFF5F5',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E6E73',
  },
  activeNavLabel: {
    color: '#8B0000',
    fontWeight: '700',
  },
});



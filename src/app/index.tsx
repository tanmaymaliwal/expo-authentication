import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
 
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth-context";

export default function Index() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const firstName = user.name?.split(" ")[0] || "User";

  const handleSignOut = () => {
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>WELCOME BACK</Text>
          <Text style={styles.title}>Hello, {firstName} 👋</Text>
        </View>

        <View style={styles.onlineContainer}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View style={styles.avatarContainer}>
            {user.picture ? (
              <Image
                source={{ uri: user.picture }}
                style={styles.avatar}
                resizeMode="cover"
                onError={(error) => {
                  console.log(
                    "Profile image error:",
                    error.nativeEvent.error
                  );
                }}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarLetter}>
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.verifiedBadge}>
              <Text style={styles.check}>✓</Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.googleStatus}>
          <View style={styles.googleIcon}>
            <Text style={styles.googleG}>G</Text>
          </View>

          <View style={styles.googleTextContainer}>
            <Text style={styles.googleTitle}>Google Account</Text>
            <Text style={styles.googleSubtitle}>
              Successfully authenticated
            </Text>
          </View>

          <View style={styles.successCircle}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.accountCard}>
        <View style={styles.accountRow}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>👤</Text>
          </View>

          <View style={styles.accountContent}>
            <Text style={styles.accountLabel}>Full Name</Text>
            <Text style={styles.accountValue}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.accountRow}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>✉️</Text>
          </View>

          <View style={styles.accountContent}>
            <Text style={styles.accountLabel}>Email Address</Text>
            <Text style={styles.accountValue}>{user.email}</Text>
          </View>
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        style={styles.signOutButton}
        activeOpacity={0.8}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutIcon}>↪</Text>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>Expo Authentication</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1020",
    paddingHorizontal: 22,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0B1020",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 25,
  },

  greeting: {
    color: "#7F8AA8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 5,
  },

  onlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121A2D",
    borderWidth: 1,
    borderColor: "#26314A",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },

  onlineText: {
    color: "#A8B2CA",
    fontSize: 12,
    fontWeight: "600",
  },

  profileCard: {
    backgroundColor: "#151D32",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#252F49",
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    width: 82,
    height: 82,
    position: "relative",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  avatarFallback: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLetter: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },

  verifiedBadge: {
    position: "absolute",
    right: -2,
    bottom: 2,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#22C55E",
    borderWidth: 3,
    borderColor: "#151D32",
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 17,
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },

  profileEmail: {
    color: "#8994AE",
    fontSize: 13,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#252F49",
    marginVertical: 20,
  },

  googleStatus: {
    flexDirection: "row",
    alignItems: "center",
  },

  googleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  googleG: {
    color: "#4285F4",
    fontSize: 19,
    fontWeight: "700",
  },

  googleTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  googleTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  googleSubtitle: {
    color: "#7F8AA5",
    fontSize: 12,
    marginTop: 3,
  },

  successCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#163C2A",
    alignItems: "center",
    justifyContent: "center",
  },

  successCheck: {
    color: "#22C55E",
    fontSize: 13,
    fontWeight: "800",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 27,
    marginBottom: 12,
  },

  accountCard: {
    backgroundColor: "#151D32",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#252F49",
    paddingHorizontal: 17,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#1D263D",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 17,
  },

  accountContent: {
    flex: 1,
    marginLeft: 13,
  },

  accountLabel: {
    color: "#7D88A3",
    fontSize: 11,
    marginBottom: 4,
  },

  accountValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  rowDivider: {
    height: 1,
    backgroundColor: "#252F49",
    marginLeft: 55,
  },

  signOutButton: {
    height: 52,
    borderRadius: 16,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#542B32",
    backgroundColor: "#24171D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signOutIcon: {
    color: "#F87171",
    fontSize: 20,
    marginRight: 8,
  },

  signOutText: {
    color: "#F87171",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    color: "#4E5872",
    textAlign: "center",
    fontSize: 11,
    marginTop: 17,
  },
});
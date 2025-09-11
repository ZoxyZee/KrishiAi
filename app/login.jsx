// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   // Image,
//   // Dimensions,
//   Button
// } from 'react-native';

// // const { width } = Dimensions.get('window');

// const LoginRegisterScreen = () => {
//   const [activeTab, setActiveTab] = useState('Login');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const router = useRouter();

//   const handleLogin = async () => {
//     router.replace("/(tabs)");
//   };
  
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.logoContainer}>
//           <View style={styles.logo}>
//             <Text style={styles.logoText}>🏢</Text>
//           </View>
//         </View>
//         <View style={styles.languageContainer}>
//           <Text style={styles.languageText}>🌐 EN | മലയാളം</Text>
//         </View>
//       </View>

//       {/* Main Content */}
//       <View style={styles.content}>
//         {/* Tab Selector */}
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Login" && styles.activeTab]}
//             onPress={() => setActiveTab("Login")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Login" && styles.activeTabText,
//               ]}
//             >
//               Login
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === "Register" && styles.activeTab]}
//             onPress={() => setActiveTab("Register")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "Register" && styles.activeTabText,
//               ]}
//             >
//               Register
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Form Container */}
//         <View style={styles.formContainer}>
//           {/* Phone Number Input */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Phone No."
//               placeholderTextColor="#999"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//             />
//           </View>

//           {/* Password Input */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           {/* Login Button */}
//           <TouchableOpacity style={styles.loginButton}>
//             <Button  title='Login' style={styles.loginButtonText}  onPress={handleLogin}>Login</Button>
//           </TouchableOpacity>

//           {/* OR Divider */}
//           <View style={styles.dividerContainer}>
//             <Text style={styles.dividerText}>OR</Text>
//           </View>

//           {/* Google Login Button */}
//           <TouchableOpacity style={styles.googleButton}>
//             <Text style={styles.googleButtonText}>Login with</Text>
//             <View style={styles.googleIcon}>
//               <Text style={styles.googleIconText}>G</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>
//           By continuing, you agree to our{"\n"}
//           <Text style={styles.linkText}>Terms & Privacy Policy</Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8F4F8',
//     paddingTop: 30, // instead of SafeAreaView
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   logoContainer: {
//     alignItems: 'flex-start',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#4CAF50',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#2E7D32',
//   },
//   logoText: {
//     fontSize: 20,
//     color: 'white',
//   },
//   languageContainer: {
//     alignItems: 'flex-end',
//   },
//   languageText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#E0E0E0',
//     borderRadius: 25,
//     marginBottom: 30,
//     overflow: 'hidden',
//   },
//   tab: {
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//   },
//   activeTab: {
//     backgroundColor: '#8E7EFF',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: 'white',
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     padding: 30,
//     width: '100%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#8E7EFF',
//     borderRadius: 10,
//     paddingVertical: 15,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     marginVertical: 10,
//   },
//   dividerText: {
//     fontSize: 14,
//     color: '#999',
//     fontWeight: '500',
//   },
//   googleButton: {
//     backgroundColor: '#7B9EFF',
//     borderRadius: 10,
//     paddingVertical: 15,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   googleButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//     marginRight: 10,
//   },
//   googleIcon: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   googleIconText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#4285F4',
//   },
//   footer: {
//     alignItems: 'center',
//     paddingBottom: 30,
//     paddingHorizontal: 40,
//   },
//   footerText: {
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#666',
//     lineHeight: 16,
//   },
//   linkText: {
//     color: '#8E7EFF',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginRegisterScreen;


import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import axiosInstance from '../utils/axiosInstance';

const LoginRegisterScreen = () => {
  const [activeTab, setActiveTab] = useState('Login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // const response = await fetch('http://your-server-url/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phoneNumber,
      //     password,
      //   }),
      // });

      const response = await axiosInstance.post("/auth/login", {
        phoneNumber,
        password,
      });

      const data = await response.data.data;
      console.log(data)
      
      if (response.status === 200) {
        // Store token if needed
        // await AsyncStorage.setItem('token', data.token);
        router.replace("/(tabs)");
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      console.log(fullName, phoneNumber, password)
      // const response = await fetch('http://your-server-url/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     fullName,
      //     phoneNumber,
      //     password,
      //   }),
      // });

      const response = await axiosInstance.post("/auth/register", {fullName, phoneNumber, password})

      const data = await response.data.data;
      console.log(data)
      
      if (response.status === 200) {
        Alert.alert('Success', 'Registration successful! Please login.', [
          { text: 'OK', onPress: () => setActiveTab('Login') }
        ]);
        // Clear form
        setFullName('');
        setPhoneNumber('');
        setPassword('');
      } else {
        Alert.alert('Registration Failed', data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login integration coming soon!');
  };

  const resetForm = () => {
    setPhoneNumber('');
    setPassword('');
    setFullName('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🌾</Text>
            </View>
          </View>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>🌐 EN | മലയാളം</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Login" && styles.activeTab]}
              onPress={() => handleTabChange("Login")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Login" && styles.activeTabText,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Register" && styles.activeTab]}
              onPress={() => handleTabChange("Register")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Register" && styles.activeTabText,
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Full Name Input - Only for Register */}
            {activeTab === 'Register' && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone No."
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                minLength={activeTab === 'Register' ? 6 : undefined}
              />
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              style={[styles.actionButton, loading && styles.disabledButton]}
              onPress={activeTab === 'Login' ? handleLogin : handleRegister}
              disabled={loading}
            >
              <Text style={styles.actionButtonText}>
                {loading ? 'Please wait...' : activeTab}
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <Text style={styles.dividerText}>OR</Text>
            </View>

            {/* Google Login Button */}
            <TouchableOpacity 
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              <Text style={styles.googleButtonText}>
                {activeTab === 'Login' ? 'Login' : 'Sign up'} with
              </Text>
              <View style={styles.googleIcon}>
                <Text style={styles.googleIconText}>G</Text>
              </View>
            </TouchableOpacity>

            {/* Switch Tab Link */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {activeTab === 'Login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
              </Text>
              <TouchableOpacity 
                onPress={() => handleTabChange(activeTab === 'Login' ? 'Register' : 'Login')}
              >
                <Text style={styles.switchLink}>
                  {activeTab === 'Login' ? 'Register' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{"\n"}
            <Text style={styles.linkText}>Terms & Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2E7D32',
  },
  logoText: {
    fontSize: 20,
    color: 'white',
  },
  languageContainer: {
    alignItems: 'flex-end',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    marginBottom: 30,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#8E7EFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#8E7EFF',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    marginVertical: 10,
  },
  dividerText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: '#7B9EFF',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  googleIcon: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#666',
  },
  switchLink: {
    fontSize: 14,
    color: '#8E7EFF',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 40,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  linkText: {
    color: '#8E7EFF',
    textDecorationLine: 'underline',
  },
});

export default LoginRegisterScreen;
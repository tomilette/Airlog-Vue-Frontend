import request from '@/utils/request'
// import { signInWithEmailAndPassword } from 'firebase/auth'

export function login(data) {
  // signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         res.send({ status: true, uid: user.uid });
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         if (errorCode == "auth/invalid-email") {
  //             res.send({ status: false, message: "Invalid Email" });
  //         } else if (errorCode == "auth/user-not-found") {
  //             res.send({ status: false, message: "User not found" });
  //         } else if (errorCode == "auth/wrong-password") {
  //             res.send({ status: false, message: "Wrong Password" });
  //         } else if (errorCode == "auth/too-many-requests") {
  //             res.send({ status: false, message: "Too many request" });
  //         } else {
  //             res.send({ status: false });
  //         }
  //     });
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

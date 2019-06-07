import ls from 'local-storage'

const AuthService = {
    _baseUrl: "http://localhost:5002",
    isAuthenticated: ls.get("isAuthenticated") || false,
    username: ls.get("username") || "",
    passHash: ls.get("passHash") || "",
    role: ls.get("role") || "dr_oak_role",

    async authenticate(cb) {
      console.log({
        "user": {
          "username": this.username,
          "password": this.passHash
        }
      })
      fetch(this._baseUrl+'/login', {
        method: "POST",
        body: JSON.stringify({
          "user": {
            "username": this.username,
            "password": this.passHash
          }
        }),
        headers: {'Content-Type':'application/json'},
      }).then(res => console.log(res))
      
/*
      if (request.status !== 200) {
        const registerRequest = await fetch(this._baseUrl+'/register', {
          method: "POST",
          body: {
            user: {
              username: this.username,
              password: this.passHash,
              isProfessor: 1
            }
          },
          headers: {'Content-Type':'application/json'},
        })
      }
*/
      //this.isAuthenticated = true
      //cb()
    },

    signout(cb) {
        this.isAuthenticated = false
        this.role = null
        ls.set('isAuthenticated', false)
        ls.set('role', null)
      setTimeout(cb, 500) // fake async
    }
}

export default AuthService
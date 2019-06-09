import ls from 'local-storage'

const AuthService = {
    _baseUrl: "http://localhost:5002",
    isAuthenticated: ls.get("isAuthenticated") || false,
    username: ls.get("username") || "",
    passHash: ls.get("passHash") || "",
    role: ls.get("role") || "dr_oak_role",

    async authenticate(cb) {
      
      const response = await fetch(this._baseUrl+'/login', {
        method: "POST",
        body: JSON.stringify({
          "user": {
            "username": this.username,
            "password": this.passHash
          }
        }),
        headers: {'Content-Type':'application/json'},
      }).then(res => res.json())

      if (Array.isArray(response.result)) {
        this.isAuthenticated = true;
        this.role = response.result[0].isProfessor ? "dr_oak_role" : "regular_role"

        ls.set("isAuthenticated", this.isAuthenticated)
        ls.set("username", this.username)
        ls.set("passHash", this.passHash)
        ls.set("role", this.role)

        cb();
      }
      else {
        alert(response)
      }
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
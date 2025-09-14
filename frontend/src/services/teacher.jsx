const TeacherServices = {
    createTeacher : async (value) => {
       try {
        const response = await fetch(`${import.meta.env.VITE_PORT}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        const data = await response.json()
       return data
        
       } catch (error) {
      return error
        
        // console.log(error.message);
        
       }
        
    },
    getTeachers : async (page, limit) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PORT}/teachers?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                              
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return error
        }
    }
}
export default TeacherServices
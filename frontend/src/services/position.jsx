const PositionService = {
    create  : async (value) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PORT}/teacher-positions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    getAll : async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PORT}/teacher-positions`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                
            })
      
            
            if (!response.ok) {
                throw new Error(`Error fetching positions: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            
            return data;
       
        
        } catch (error) {
            throw new Error(error)
        }
    }
}
export default PositionService
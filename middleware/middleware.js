// Implement validation middleware to check for required fields in the POST and PUT routes.
export function userValidation(req, res, next) {
    const { fullName, age, profession, location, experience, skills, email, isWorking } = req.body;

    //If required field is missing
    if (fullName === undefined ||
        age === undefined ||
        profession === undefined ||
        experience === undefined ||
        skills === undefined ||
        email === undefined ) {
        return res.status(400).json({ message: "All fields (fullName , age , profession  , experience , skills , email ) are required" });
    }

    //Skills validation - should add in array
    if (!Array.isArray(skills)) {
        return res.status(412).json({
            error: "Validation Error",
            message: "Skills should be in an array"
        });
    }

    //Skills validation - add atleast one skill
    if (skills.length === 0) {
        return res.status(412).json({
            error: "Validation Error",
            message: "Add atleast one skill"
        });
    }

    //Validattion for - experience and age should be a number
    if (typeof experience !== 'number' || isNaN(experience) || typeof age !== 'number' || isNaN(age)) {
        return res.status(412).json({
            error: "Validation Error",
            message: "Experience and Age must be a number"
        });
    };
    
    //Age should be between 18 to 50
    if(age < 18 || age > 50){
        return res.status(412).json({
            error : "Validation Error",
            message : "Age must be between 18 - 50"
        })
    }

    //Validate for isWorking
    if (typeof isWorking !== 'boolean') {
        return res.status(412).json({
            error: "Validation Error",
            message: "isWorking must be a boolean (true or false)"
        });
    };

    //validation for - Fullname, profession, email and location
    //must be a string
    if (typeof fullName !== "string" ||
        typeof profession !== "string" ||
        typeof email !== "string" ) {
        return res.status(412).json({
            error: "Validation Error",
            message: "fullName, profession, email and  must be strings"
        });
    }

    //validation for - Fullname, profession, email and location
    //must be non-empty string
    const stringFields = {fullName , profession , email};
    for (let [key , value] of Object.entries(stringFields)){
        if(value.trim() === ''){
            return res.status(412).json({
                error : "Validation Error" ,
                message : `${key} must be a non-empty string`
            })
        }
    }

    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(412).json({
            error : "Validation Error",
            message : "Invalid email format"
        })
    }

    //continue
    next();
}





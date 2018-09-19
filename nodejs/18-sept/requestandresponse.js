//1]This for first get Method
//Request
//get =http://localhost:8090/allcompanies
//Response
[
    [{
            _id: '5ba0b714a062771177edbcbe',
            companyName: 'Samsung',
            address: 'shivajiNagar',
            country: 'India',
            state: 'Maharashtra',
            city: 'pune',
            status: 'activated',
            __v: 0
        },
        {
            _id: '5ba0b75ca062771177edbcbf',
            companyName: 'MI',
            address: 'shivajiNagar',
            country: 'Dubai',
            state: 'Maharashtra',
            city: 'pune',
            status: 'activated',
            __v: 0
        },
        {
            _id: '5ba0dc09a9896612124bc27f',
            companyName: 'Micromax',
            address: 'shivajiNagar',
            country: 'Dubai',
            state: 'Maharashtra',
            city: 'pune',
            status: 'activated',
            __v: 0
        },
        {
            _id: '5ba0e05e7971bf58b9423e7b',
            companyName: 'Dell',
            address: 'shivajiNagar',
            country: 'Dubai',
            state: 'Maharashtra',
            city: 'Mumbai',
            status: 'activated',
            __v: 0
        }
    ]
]


//2]This for Second get Method
//Request
//get = http://localhost:8090/allcompanies/Micromax
//Response
[
    [{
        _id: "5ba0dc09a9896612124bc27f",
        companyName: 'Micromax',
        address: 'shivajiNagar',
        country: 'Dubai',
        state: 'Maharashtra',
        city: 'pune',
        status: 'activated',
        __v: 0
    }]
]

//3]This for Third get Method
//Request
//get = http://localhost:8090/companies/Micromax?state=Maharashtra
//Response
[
    [{
        _id: "5ba0dc09a9896612124bc27f",
        companyName: 'Micromax',
        address: 'shivajiNagar',
        country: 'Dubai',
        state: 'Maharashtra',
        city: 'pune',
        status: 'activated',
        __v: 0
    }]
]

//4]THis for post method
//Request
//post = http://localhost:8090/addcompany
//body = 
{
    "companyName": "Nokia",
    "address": "shivajiNagar",
    "country": "Dubai",
    "state": "Maharashtra",
    "city": "pune"
}
//Response
//New Company is added

//5]This for first put method
//Request
//put = http://localhost:8090/update/MI
//body = 
{
    "address": "shivajiNagar",
    "country": "Dubai",
    "state": "Maharashtra",
    "city": "pune",
    "status": "activated"
}
//Response
//update company with new data

//6]This for Second put method
//Request
//put = http://localhost:8090/update?state=Maharashtra
//body = 
{
    "address": "shivajiNagar",
    "country": "Dubai",
    "state": "Maharashtra",
    "city": "pune",
}
//Response
//update company with new data


//7]This for delete method
//Request
//delete =  http://localhost:8090/company/MI
//Response
//DataDeleted Successfully
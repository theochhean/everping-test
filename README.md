# Everping Test
## Getting started
Project separated in two parts: `front` and `back`

Open two terminals, one goes to `\frontend`, the other goes to `\backend`
```bash
cd .\frontend\
```

```bash
cd .\backend\  
```

Install packages in each of them : 
```bash
npm install
```

And then launch both of them : 
```bash
npm start
```

You can reach the project at `http://localhost:3000/` 


## The project
Goal is to set up a Devices Dahsboard

User can see their Client's computer fleet and have a quick view of the security health for each device, and filter the list based on the security statuses

## Work Done
Project has been done in a few hours based on the instructions, no exact time but around what was expected
### Frontend
Frontend is divided into 2 parts : ClientsLists and DevicesTable
![image](https://github.com/theochhean/everping-test/assets/37695694/b1df2db7-1fc3-464a-b97c-559588683c32)

User can select a Client from the Select List to see their Devices and their status

It can also filter the list based on each status (Healthy Devices, Firewall of, Antivirus off, Encryption off, Older than 30 days)

### Backend
Backend is a simple REST API with 2 routes, where we can :
- Retrieve the devices from a clientId
- Retrieve the list of all the clients (doc said that there should be only one route, but I've decided to add this one in order to not hard code the list of clients in the front)


**Routes**
  
| Method  | URL                      | Data to send                          | Response                             | Description                           |
|---------|--------------------------|---------------------------------------|--------------------------------------|---------------------------------------|
| GET     | /clients                 | None                                  | {clientsIds: string[]}               | Fetch ClientsIds                      |
| GET     | /devices/:id             | string                                | {devices: Device[]}                  | Fetch Devices based on ClientId       |


## To Do
- add front and back tests, not really familiar with it so currently learning it, would have taken more time than allowed on the instructions to add them

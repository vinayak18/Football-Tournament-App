export class PlayerClass
{
    id:number;
    teamId:number;
    team11status:boolean;
    name:string;
    type:string;
    age:number;
    constructor(id,teamId,team11status,name,type,age){
        this.id=id;
        this.teamId=teamId;
        this.team11status=team11status;
        this.name=name;
        this.type=type;
        this.age=age;
        
    }
}
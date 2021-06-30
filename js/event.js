
class simple_story{
    constructor(json) {
        this.story = json["story"];
        this.branch = json["branch"];
        if(json.hasOwnProperty("exp")){
            this.exp=new Function("element",json["exp"]);
        }else{
            this.exp=new Function("element","");
        }
    }
    getStory(){
        var e=newElement("<p></p>");
        this.story.forEach(text => {
            e.appendChild(newElement("<p style='text-indent: 2em;'>"+text+"</p>"));
        });
        this.exp(e);
        e.appendChild(newElement("<br>"));
        return e;
    }
    getNext(random){
        var next="end";
        var b=this.branch;
        for(var l=0;l<b.length;l++){
            if(b[l]["limit"]>=random){
                next=b[l]["next"];
                break;
            }
        }
        console.log(next);
        return next;
    }
}

class simple_event {
    constructor(json) {
        this.event=json;
    }
    getAuthor(){
        return this.event["author"];
    }
    getName(){
        return this.event["name"];
    }
    getDes(){
        return this.event["des"];
    }
    getTime(){
        return this.event["time"];
    }
    getEvent(){
        if(!this.event.hasOwnProperty("head")){
            return newElement("<p>未发现事件起始</p>")
        }
        var e=newElement("<p></p>");
        var now="head";
        while(true){
            var p=new simple_story(this.event[now]);
            e.appendChild(p.getStory());
            var now=p.getNext(Math.seededRandom(1,100));
            if(now=="end"){
                return e;
            }
        }
    }
}

var test_event = [
    {
        "author": "Fuyumi",
        "name":"test",
        "des":"test_des",
        "time":"所有",
        "head": {
            "story": ["这是测试文件的头部","这是测试文件的头部2","这是测试文件的头部3"],
            "exp":"",
            "branch": [
                {
                    "limit": 1,
                    "next":"branch1"
                },
                {
                    "limit": 100,
                    "next":"branch2"
                }
            ]
        },
        "branch1":{
            "story": ["这是测试文件的branch1","这是测试文件的branch1","这是测试文件的branch1"],
            "branch": [
                {
                    "limit": 100,
                    "next":"end"
                }
            ]
        },
        "branch2":{
            "story": ["branch2","branch2","branch2"],
            "branch": [
                {
                    "limit": 100,
                    "next":"end"
                }
            ]
        }
    }
]
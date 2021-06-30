
class simple_story{
    constructor(json) {
        this.next_flag="";
        this.story = json["story"];
        this.branch = json["branch"];
        if(json.hasOwnProperty("exp")){
            this.exp=new Function("element","story",json["exp"]);
        }else{
            this.exp=new Function("element","story","");
        }
    }
    getStory(){
        var e=newElement("<p></p>");
        this.story.forEach(text => {

            text=text.replace("#NAME#",user_name);

            e.appendChild(newText(text));
        });
        this.exp(e,this);
        e.appendChild(newElement("<br>"));
        return e;
    }
    getNext(random){
        var next="end";
        if(this.next_flag==""){
            var b=this.branch;
            for(var l=0;l<b.length;l++){
                if(b[l]["limit"]>=random){
                    next=b[l]["next"];
                    break;
                }
            }
        }else{
            next=this.next_flag;
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
        var deep=0;
        while(true){
            var p=new simple_story(this.event[now]);
            e.appendChild(p.getStory());
            var now=p.getNext(Math.seededRandom(1,100));
            if(now=="end"){
                return e;
            }
            deep++;
            if(deep>1000){
                return e;
            }
        }
    }
}

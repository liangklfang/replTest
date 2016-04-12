function Segment(){

}
Segment.prototype.useDefault=function(){
	return 12;
}
Segment.prototype.doSegment=function(str){
	return new Date()+str;
}
module.exports=Segment;

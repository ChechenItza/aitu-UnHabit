(this["webpackJsonpaitu-apps-react-boilerplate"]=this["webpackJsonpaitu-apps-react-boilerplate"]||[]).push([[0],{173:function(t,e,r){"use strict";r.r(e),r.d(e,"createSwipeBackGesture",(function(){return i}));var a=r(15),n=(r(32),r(52)),i=function(t,e,r,i,c){var o=t.ownerDocument.defaultView;return Object(n.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:r,onMove:function(t){var e=t.deltaX/o.innerWidth;i(e)},onEnd:function(t){var e=t.deltaX,r=o.innerWidth,n=e/r,i=t.velocityX,u=r/2,s=i>=0&&(i>.2||t.deltaX>u),p=(s?1-n:n)*r,l=0;if(p>5){var d=p/Math.abs(i);l=Math.min(d,540)}c(s,n<=0?.01:Object(a.j)(0,n,.9999),l)}})}}}]);
//# sourceMappingURL=0.7f9b39ad.chunk.js.map
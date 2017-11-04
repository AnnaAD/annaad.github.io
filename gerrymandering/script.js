var c = document.getElementById("canvas");
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
c.width = x;
c.height = y - 55;
var ctx = c.getContext("2d");
ctx.fillRect(10,10,10,10);
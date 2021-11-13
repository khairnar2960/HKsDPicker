window.addEventListener("load", () => {
    let e = document.getElementsByTagName("head")[0],
        t = document.createElement("style");
    t.type = "text/css", t.innerHTML = ".picker-wrap{position:relative;margin-top:5px;opacity:0;visibility:hidden;transition:opacity .2s;font-family:Roboto}.picker-wrap.show{opacity:1;visibility:visible}.picker-wrap .picker{margin:0;border-radius:5px;border:1px solid gray;box-sizing:border-box;box-shadow:1px 1px 5px 0 #a9a9a9}.picker{max-width:250px;background:#333;padding:10px}.picker-m,.picker-y{width:48%;padding:3px 0;font-size:11pt;border:none;border-radius:2px;text-align:center;font-family:Roboto;background-color:#e3e3e3}.picker-y{margin-left:9px}.picker-d table{color:#fff;width:100%;font-size:10pt;margin-top:10px}.picker-d table td{width:14.28%;height:25.76px;padding:3px;text-align:center}tr.picker-d-h{margin:15px!important}tr.picker-d-h td.normal{background-color:#109d4e}tr.picker-d-h td.holliday{background-color:#e30303}.picker-d-td{background:#859ba2;border-radius:5px;font-weight:700}.picker-d-d:hover{cursor:pointer;background:#a9a9a9;border-radius:5px;color:#333;font-weight:700}.picker-d-dd{color:#888;background:#4e4e4e;border-radius:5px}", e.appendChild(t), document.getElementById("HKsDPicker").placeholder = "DD/MM/YYYY"
});
var picker = {
    attach: function(e) {
        var t = document.createElement("div");
        t.dataset.target = e.target, t.dataset.startmon = e.startmon ? "1" : "0", t.classList.add("picker"), e.disableday && (t.dataset.disableday = JSON.stringify(e.disableday));
        var a = new Date,
            r = a.getUTCMonth(),
            d = a.getUTCFullYear(),
            i = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            n = document.createElement("select"),
            s = null;
        for (var o in n.classList.add("picker-m"), i)(s = document.createElement("option")).value = parseInt(o) + 1, s.text = i[o], n.appendChild(s);
        n.selectedIndex = r, n.addEventListener("change", function() {
            picker.draw(this)
        }), t.appendChild(n), (n = document.createElement("select")).classList.add("picker-y");
        for (var c = d; c >= 1947; c--)(s = document.createElement("option")).value = c, s.text = c, c == d && s.setAttribute("selected", "selected"), n.appendChild(s);
        n.addEventListener("change", function() {
            picker.draw(this)
        }), t.appendChild(n);
        var l = document.createElement("div");
        if (l.classList.add("picker-d"), t.appendChild(l), picker.draw(n), e.container) document.getElementById(e.container).appendChild(t);
        else {
            for (var p = 0; null != document.getElementById("picker-" + p);) p = Math.floor(98 * Math.random()) + 1;
            t.dataset.popup = "1", t.dataset.dpid = p;
            var m = document.createElement("div");
            m.id = "picker-" + p, m.classList.add("picker-wrap"), m.appendChild(t);
            var u = document.getElementById(e.target);
            u.dataset.dp = p, u.readOnly = !0, u.onfocus = function() {
                document.getElementById("picker-" + this.dataset.dp).classList.add("show")
            }, m.addEventListener("click", function(e) {
                e.target.classList.contains("picker-wrap") && this.classList.remove("show")
            }), document.body.appendChild(m)
        }
    },
    draw: function(e) {
        var t = e.parentElement,
            a = t.getElementsByClassName("picker-y")[0].value,
            r = t.getElementsByClassName("picker-m")[0].value,
            d = t.getElementsByClassName("picker-d")[0],
            i = new Date(Date.UTC(a, r, 0)).getUTCDate(),
            n = 0 == (n = new Date(Date.UTC(a, r - 1, 1)).getUTCDay()) ? 7 : n,
            s = 0 == (s = new Date(Date.UTC(a, r - 1, i)).getUTCDay()) ? 7 : s,
            o = [],
            c = null;
        if (t.dataset.disableday && (c = JSON.parse(t.dataset.disableday)), "1" == t.dataset.startmon && 1 != n)
            for (var l = 1; l < n; l++) o.push("B");
        if ("0" == t.dataset.startmon && 7 != n)
            for (l = 0; l < n; l++) o.push("B");
        if (null == c)
            for (l = 1; l <= i; l++) o.push([l, !1]);
        else {
            var p = n;
            for (l = 1; l <= i; l++) {
                var m = c.includes(p);
                o.push([l, m]), 8 == ++p && (p = 1)
            }
        }
        if ("1" == t.dataset.startmon && 7 != s)
            for (l = s; l < 7; l++) o.push("B");
        if ("0" == t.dataset.startmon && 6 != s)
            for (l = s; l < (7 == s ? 13 : 6); l++) o.push("B");
        var u = ["MO", "TU", "WE", "TH", "FR", "SA"];
        "1" == t.dataset.startmon ? u.push("SU") : u.unshift("SU");
        var k = document.createElement("table"),
            h = k.insertRow(),
            g = null;
        k.setAttribute("style", "border-collapse: collapse;"), h.classList.add("picker-d-h");
        for (let e of u)(g = h.insertCell()).innerHTML = e, "SU" == e ? g.setAttribute("class", "holliday") : g.setAttribute("class", "normal");
        var f = o.length,
            v = (h = k.insertRow(), new Date),
            y = null;
        v.getUTCMonth() + 1 == r && v.getUTCFullYear() == a && (y = v.getUTCDate());
        for (l = 0; l < f; l++) l != f && l % 7 == 0 && (h = k.insertRow()), g = h.insertCell(), "B" == o[l] ? g.classList.add("picker-d-b") : (g.innerHTML = o[l][0], o[l][1] ? g.classList.add("picker-d-dd") : (l == y && g.classList.add("picker-d-td"), g.classList.add("picker-d-d"), g.addEventListener("click", function() {
            picker.pick(this)
        })));
        d.innerHTML = "", d.appendChild(k)
    },
    pick: function(e) {
        for (var t = e.parentElement; !t.classList.contains("picker");) t = t.parentElement;
        var a = t.getElementsByClassName("picker-y")[0].value,
            r = t.getElementsByClassName("picker-m")[0].value,
            d = e.innerHTML;
        parseInt(r) < 10 && (r = "0" + r), parseInt(d) < 10 && (d = "0" + d);
        var i = d + "/" + r + "/" + a;
        document.getElementById(t.dataset.target).value = i, "1" == t.dataset.popup && document.getElementById("picker-" + t.dataset.dpid).classList.remove("show")
    }
};
window.addEventListener("load", function() {
    picker.attach({
        target: "HKsDPicker"
    })
});

$(document).ready(function() {
    $("#index").indexify({
        source: "#content",
        classSelector: "indexify-index"
    });
    $("#demo1-index").indexify({
        source: "#demo1"
    });
    $("#demo2").indexify({
        mode: "prepend"
    });
    $("#demo3").indexify({
        mode: "append"
    });
});

function init_plan(plan, width, height) {
    plan.width = typeof width !== 'undefined' ? width : 500 ;
    plan.height = typeof height !== 'undefined' ? height : 500 ;
    plan.custom = {
        centerX: plan.width / 2,
        centerY: plan.height / 2
    };
    msg('centerX', plan.custom.centerX);
    msg('centerX', plan.custom.centerY);
    return plan;
}

function draw_plan(plan) {
    var graph = plan.getContext('2d');

    for (var x = 0.5; x <= plan.width; x += 10) {
        graph.moveTo(x, 0);
        graph.lineTo(x, plan.height);
    }

    for (var y = 0.5; y <= plan.height; y += 10) {
        graph.moveTo(0, y);
        graph.lineTo(plan.width, y);
    }
    graph.strokeStyle = "#eee";
    graph.stroke();

    graph.beginPath();
    // line y
    graph.moveTo(0, plan.custom.centerY);
    graph.lineTo(plan.width, plan.custom.centerY);
    // line x
    graph.moveTo(plan.custom.centerX, 0);
    graph.lineTo(plan.custom.centerX, plan.height);
    // arrow left
    graph.moveTo(0, plan.custom.centerY);
    graph.lineTo(10, plan.custom.centerY - 10);
    graph.moveTo(0, plan.custom.centerY);
    graph.lineTo(10, plan.custom.centerY + 10);
    // arrow top
    graph.moveTo(plan.custom.centerX, 0);
    graph.lineTo(plan.custom.centerX - 10, 10);
    graph.moveTo(plan.custom.centerX, 0);
    graph.lineTo(plan.custom.centerX + 10, 10);
    // arrow right
    graph.moveTo(plan.width, plan.custom.centerY);
    graph.lineTo(plan.width - 10, plan.custom.centerY + 10);
    graph.moveTo(plan.width, plan.custom.centerY);
    graph.lineTo(plan.width - 10, plan.custom.centerY - 10);
    // arrow down
    graph.moveTo(plan.custom.centerX, plan.height);
    graph.lineTo(plan.custom.centerX - 10, plan.height - 10);
    graph.moveTo(plan.custom.centerX, plan.height);
    graph.lineTo(plan.custom.centerX + 10, plan.height - 10);

    graph.strokeStyle = "#000";
    graph.stroke();

    graph.font = "bold 12px sans-serif";
    graph.fillText("x", plan.width - 30, plan.custom.centerY - 20);
    graph.fillText("y", plan.custom.centerX + 20, 30);

    return graph;
}

angular.module('green-streak.directives', ['d3'])

    .directive('d3Bars', ['d3', function (d3) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function (scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0])
                    .append("svg")
                    .attr("width", "100%");

                // on window resize, re-render d3 canvas
                window.onresize = function () {
                    return scope.$apply();
                };
                scope.$watch(function () {
                        return angular.element(window)[0].innerWidth;
                    }, function () {
                        return scope.render(scope.data);
                    }
                );

                // watch for data changes and re-render
                scope.$watch('data', function (newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function (data) {
                    // remove all previous items before render
                    svg.selectAll("*").remove();

                    // setup variables
                    var width, height, max;
                    width = d3.select(iElement[0])[0][0].offsetWidth - 20;
                    // 20 is for margins and can be changed
                    height = scope.data.length * 35;
                    // 35 = 30(bar height) + 5(margin between bars)
                    max = 98;
                    // this can also be found dynamically when the data is not static
                    // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

                    // set the height based on the calculations above
                    svg.attr('height', height);

                    //create the rectangles for the bar chart
                    svg.selectAll("rect")
                        .data(data)
                        .enter()
                        .append("rect")
                        .on("click", function (d, i) {
                            return scope.onClick({item: d});
                        })
                        .attr("height", 30) // height of each bar
                        .attr("width", 0) // initial width of 0 for transition
                        .attr("x", 10) // half of the 20 side margin specified above
                        .attr("y", function (d, i) {
                            return i * 35;
                        }) // height + margin between bars
                        .transition()
                        .duration(1000) // time of duration
                        .attr("width", function (d) {
                            return d.score / (max / width);
                        }); // width based on scale

                    svg.selectAll("text")
                        .data(data)
                        .enter()
                        .append("text")
                        .attr("fill", "#fff")
                        .attr("y", function (d, i) {
                            return i * 35 + 22;
                        })
                        .attr("x", 15)
                        .text(function (d) {
                            return d[scope.label];
                        });

                };
            }
        };
    }])

    .directive('d3Pie', ['d3', function (d3) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function (scope, iElement, iAttrs) {
                var width = 1000,
                    height = 500,
                    topMargin = 30,
                    radius = Math.min(width, height - topMargin) / 2,
                    labelRadius = 150,
                    transitionTime = 2000;

                var color = d3.scale.category20();

                var end = new Date(2014, 2, 10, 23, 59, 59)

                var arc = d3.svg.arc()
                    .outerRadius(radius - topMargin);

                var pie = d3.layout.pie()
                                   .sort(null)
                                   .value(function(d) { return d.count; });

                var svg = d3.select(iElement[0]).append("svg")
                           .attr("width", width)
                           .attr("height", height)
                           .append("g")
                           .attr("transform", "translate(" + width / 2 + "," + (height) / 2  + ")");  

                var countdown = d3.select(iElement[0]).append("svg")
                                                      .attr("width", width)
                                                      .attr("height", 500); 

                // on window resize, re-render d3 canvas
                window.onresize = function () {
                    return scope.$apply();
                };
                scope.$watch(function () {
                        return angular.element(window)[0].innerWidth;
                    }, function () {
                        return scope.render(scope.data);
                    }
                );

                // watch for data changes and re-render
                scope.$watch('data', function (newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function (data) {
                    // remove all previous items before render
                    //svg.selectAll("*").remove();

                countdown.append("text").attr("class", "title")
                        .attr("class", "countdown")
                        .attr("x", width/2)             
                        .attr("y", 50)
                        .attr("text-anchor", "middle");

                setInterval(function() {
                      var now = new Date()
                      dd = d3.format("02d")
                      var remainingTime = parseInt(((new Date(+end - +now))/1000),10)
                      var remainingHours = parseInt(remainingTime/3600,10)
                      var remainingMinutes = parseInt((remainingTime - remainingHours*3600)/60,10)
                      var remainingSeconds = parseInt(remainingTime - remainingHours*3600 - remainingMinutes*60,10)
                      countdown.selectAll("text").attr("class", "title")
                                                 .attr("class", "countdown")
                                                 .attr("x", width/2)             
                                                 .attr("y", 50)
                                                 .attr("text-anchor", "middle") 
                                                 .text(dd(remainingHours) + ':' + dd(remainingMinutes) + ':' + dd(remainingSeconds));
                    }, 1000);

                data.forEach(function(d) {
                  d.count = +d.count;
                });

                var g = svg.selectAll(".arc")
                          .data(pie(data))
                          .enter().append("g")
                          .attr("class", "arc");

                g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.name); })
                  .transition()
                  .ease("bounce")
                  .duration(transitionTime)
                  .attrTween("d", tweenPie);

                var legend = svg.append("g")
                                .attr("class", "legend")
                                .attr("transform","translate(300,-250)")
                                .selectAll("g")
                                .data(color.domain().slice().reverse())
                                .enter().append("g")
                                .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

                legend.append("rect")
                      .attr("width", 24)
                      .attr("height", 24)
                      .style("fill", color)
                      .style("opacity", 0)
                      .transition()
                      .duration(2*transitionTime)
                      .style("opacity", 1);

                legend.append("text")
                      .attr("class", "body")
                      .attr("x", 28)
                      .attr("y", 11)
                      .attr("dy", ".4em")
                      .text(function(d) { return d; })
                      .style("opacity", 0)
                      .transition()
                      .duration(2*transitionTime)
                      .style("opacity", 1);

                    function tweenPie(b) {
                        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
                        return function (t) {
                            return arc(i(t));
                        };
                    }

                };
            }
        };
    }])
    .directive('d3Square', ['d3', function (d3) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function (scope, iElement, iAttrs) {

                // on window resize, re-render d3 canvas
                window.onresize = function () {
                    return scope.$apply();
                };
                scope.$watch(function () {
                        return angular.element(window)[0].innerWidth;
                    }, function () {
                        return scope.render(scope.data);
                    }
                );
                // watch for data changes and re-render
                scope.$watch('data', function (newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                var deviceWidth = window.innerWidth || document.body.clientWidth;
                var deviceHeight= window.innerHeight || document.body.clientHeight;
                var drawSize = d3.min([deviceWidth, deviceHeight])/2;
                var bufferWidth = (deviceWidth - drawSize)/2;
                var bufferHeight = (deviceHeight - drawSize)/2;
                var colorList = ["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823" , "#44a340"]
                var colorNum = 5

                //Make an SVG Container
                var svg = d3.select(iElement[0])
                    .append("svg")
                    .attr("width", deviceWidth)
                    .attr("height", deviceHeight);

                // define render function
                scope.render = function (data) {

                    var countLength = data.length
                    var latestCount = data[countLength - 1]
                    var maxCounts = d3.max(data)

                    // remove all previous items before render
                    //Draw the Rectangle
                    if(maxCounts) {
                    svg.append("rect")
                        .attr("fill", function (d) {
                            tmp = ((colorNum - 1) * latestCount / maxCounts)
                            tmp = d3.round(tmp)
                            if (latestCount > 0) {
                                if (tmp === 0) {
                                    tmp = 1
                                }
                            }
                            return colorList[tmp];
                        })
                        .attr("x", bufferWidth + drawSize/2)
                        .attr("y", bufferHeight + drawSize/2)
                        .attr("width", 1)
                        .attr("height", 1)
                        .transition()
                        .duration(1000)
                        .attr("x", bufferWidth)
                        .attr("y", bufferHeight)
                        .attr("width", drawSize)
                        .attr("height", drawSize);
                    }
                };
            }
        };
    }]);
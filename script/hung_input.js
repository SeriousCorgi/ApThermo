$(function() {
	var plot_opts = {
		side: 400,
		margin: {top:70,left:150,bottom:150,right:150},
		axis_labels:['OH','F','Cl'],
		axis_ticks:d3.range(0, 101, 20),
		minor_axis_ticks:d3.range(0, 101, 5)
	};
	tp = ternaryPlot( '#plot', plot_opts );
	$(".Compute").click(function(e) {
		var f =$('#f').val();
		sessionStorage.setItem("f", f);
		var cl =$('#cl').val()
		sessionStorage.setItem("cl", cl);
		var h2o =$('#h2o').val()
		sessionStorage.setItem("h2o", h2o);
		var co2 =$('#co2').val()
		sessionStorage.setItem("co2", co2);
		var t =$('#t').val()
		sessionStorage.setItem("t", t);
		var p =$('#p').val()
		sessionStorage.setItem("p", p);
		var f2=$('#f2').val()
		sessionStorage.setItem("f2", f2);
		var cl2 =$('#cl2').val()
		sessionStorage.setItem("cl2", cl2);
		var h2o2=$('#h2o2').val()
		sessionStorage.setItem("h2o2", h2o2);
		var co22=$('#co22').val()
		sessionStorage.setItem("co22", co22);
		var cao=$('#cao').val()
		sessionStorage.setItem("cao", cao);
		var p2o5=$('#p2o5').val()
		sessionStorage.setItem("p2o5", p2o5);
		var so3=$('#so3').val()
		sessionStorage.setItem("so3", so3);
		var sio2=$('#sio2').val()
		sessionStorage.setItem("sio2", sio2);
		var na2o=$('#na2o').val()
		sessionStorage.setItem("na2o", na2o);
		var mgo=$('#mgo').val()
		sessionStorage.setItem("mgo", mgo);
		var al2o3=$('#al2o3').val()
		sessionStorage.setItem("al2o3", al2o3);
		var mno=$('#mno').val()
		sessionStorage.setItem("mno", mno);
		var feo=$('#feo').val()
		sessionStorage.setItem("feo", feo);
		var fe2o3=$('#fe2o3').val()
		sessionStorage.setItem("fe2o3", fe2o3);
		var ce2o3=$('#ce2o3').val()
		sessionStorage.setItem("ce2o3", ce2o3);
		var sro=$('#sro').val()
		sessionStorage.setItem("sro", sro);
		var bao=$('#bao').val()
		sessionStorage.setItem("bao", bao);

	    if(!isNaN(parseFloat(f)) && !isNaN(parseFloat(cl)) && !isNaN(parseFloat(t)) && !isNaN(parseFloat(p)) && !isNaN(parseFloat(cao)) && !isNaN(parseFloat(p2o5))){
	    	location.href='hung_output.html';
	    }else{
	    	alert("Please fill in the Required fields!!");
	    }
	});

	$(".Calculate").click(function(e) {
		var xf=$('#xf').val();
		var xcl=$('#xcl').val();
		var xoh_m=$('#xoh_m').val();
		var xoh_c=$('#xoh_c').val();

		// var MassCl=35.45; // molar mass of Cl
		// var MassF=18.998; // molar mass of Cl
		// var MassH2O=18.015; // molar mass of h2o
		// var f_molar= FAp/MassF;
		// var oh_molar= H2OAp/MassH2O*2;
		// var cl_molar= ClAp/MassCl;
		// var TotalMolar = f_molar + oh_molar + cl_molar;
		// var x_f=f_molar/TotalMolar;
		// var x_oh=oh_molar/TotalMolar;
		// var x_cl=cl_molar/TotalMolar;

		if(true) {
			next();
			d3.event.preventDefault();
		}else {
			alert("Hahahaha");
		}
	});
})

function ternaryPlot(selector, userOpt ) {

	var plot = {
		dataset:[]
	};

	var opt = {
		width:700,
		height:500,
		side: 500,
		axis_labels:['A','B','C'],
		axis_ticks:[0,20,40,60,80,100],
		tickLabelMargin:10,
		axisLabelMargin:40 }

	for(var o in userOpt){
		opt[o] = userOpt[o];
	}

	var svg = d3.select(selector).append('svg')
						.attr("width", opt.width)
                        .attr("height", opt.height);

	var axes = svg.append('g').attr('class','axes');

    var w = opt.side;
    var h = Math.sqrt( opt.side*opt.side - (opt.side/2)*(opt.side/2));

	var corners = [
		[opt.margin.left, h + opt.margin.top], // a
		[ w + opt.margin.left, h + opt.margin.top], //b 
		[(w/2) + opt.margin.left, opt.margin.top] ] //c

	//axis names
	axes.selectAll('.axis-title')
		.data(opt.axis_labels)
		.enter()
			.append('g')
				.attr('class', 'axis-title')
				.attr('transform',function(d,i){
					return 'translate('+corners[i][0]+','+corners[i][1]+')';
				})
				.append('text')
				.text(function(d){ return d; })
				.attr('text-anchor', function(d,i){
					if(i===0) return 'end';
					if(i===2) return 'middle';
					return 'start';
					
				})
				.attr('transform', function(d,i){
					var theta = 0;
					if(i===0) theta = 120;
					if(i===1) theta = 60;
					if(i===2) theta = -90;

					var x = opt.axisLabelMargin * Math.cos(theta * 0.0174532925),
						y = opt.axisLabelMargin * Math.sin(theta * 0.0174532925);
					return 'translate('+x+','+y+')'
				});


	//ticks
	//(TODO: this seems a bit verbose/ repetitive!);
	var n = opt.axis_ticks.length;
	if(opt.minor_axis_ticks){
		opt.minor_axis_ticks.forEach(function(v) {	
			var coord1 = coord( [v, 0, 100-v] );
			var coord2 = coord( [v, 100-v, 0] );
			var coord3 = coord( [0, 100-v, v] );
			var coord4 = coord( [100-v, 0, v] );

			axes.append("line")
				.attr( lineAttributes(coord1, coord2) )
				.classed('a-axis minor-tick', true);	

			axes.append("line")
				.attr( lineAttributes(coord2, coord3) )
				.classed('b-axis minor-tick', true);	

			axes.append("line")
				.attr( lineAttributes(coord3, coord4) )
				.classed('c-axis minor-tick', true);		
		});
	}

	opt.axis_ticks.forEach(function(v) {	
		var coord1 = coord( [v, 0, 100-v] );
		var coord2 = coord( [v, 100-v, 0] );
		var coord3 = coord( [0, 100-v, v] );
		var coord4 = coord( [100-v, 0, v] );

		axes.append("line")
			.attr( lineAttributes(coord1, coord2) )
			.classed('a-axis tick', true);	

		axes.append("line")
			.attr( lineAttributes(coord2, coord3) )
			.classed('b-axis tick', true);	

		axes.append("line")
			.attr( lineAttributes(coord3, coord4) )
			.classed('c-axis tick', true);	


		//tick labels
		axes.append('g')
			.attr('transform',function(d){
				return 'translate(' + coord1[0] + ',' + coord1[1] + ')'
			})
			.append("text")
				.attr('text-anchor','end')
				.attr('x',-opt.tickLabelMargin)
				.text( function (d) { return v; } )
				.classed('a-axis tick-text', true );

		axes.append('g')
			.attr('transform',function(d){
				return 'translate(' + (8 + coord2[0]) + ',' + (20 + coord2[1]) + ')'
			})
			.append("text")
				.attr('text-anchor','end')
				.attr('x',-opt.tickLabelMargin)
				.text( function (d) { return (100- v); } )
				.classed('b-axis tick-text', true);
		axes.append('g')
			.attr('transform',function(d){
				return 'translate(' + coord3[0] + ',' + coord3[1] + ')'
			})
			.append("text")
				.text( function (d) { return v; } )
				.attr('x',opt.tickLabelMargin)
				.classed('c-axis tick-text', true);

	})

	function lineAttributes(p1, p2){
		return { x1:p1[0], y1:p1[1],
				 x2:p2[0], y2:p2[1] };
	}

	function coord(arr){
		var a = arr[0], b=arr[1], c=arr[2]; 
		var sum, pos = [0,0];
	    sum = a + b + c;
	    if(sum !== 0) {
		    a /= sum;
		    b /= sum;
		    c /= sum;
			pos[0] =  corners[0][0]  * a + corners[1][0]  * b + corners[2][0]  * c;
			pos[1] =  corners[0][1]  * a + corners[1][1]  * b + corners[2][1]  * c;
		}
	    return pos;
	}

	function scale(p, factor) {
	    return [p[0] * factor, p[1] * factor];
	}

	plot.data = function(data, accessor, bindBy){ //bind by is the dataset property used as an id for the join
		plot.dataset = data;

		var circles = svg.selectAll("circle")
			.data( data.map( function(d){ return coord(accessor(d)); }), function(d,i){
				if(bindBy){
					return plot.dataset[i][bindBy];
				}
				return i;
			} );

		circles.enter().append("circle");

		circles.transition().attr("cx", function (d) { return d[0]; })
			.attr("cy", function (d) { return d[1]; })
			.attr("r", 6);

		return this;
	}

	plot.getPosition = coord;
	plot.getTripple = function(x, y){
		//TODO, get percentages for a give x, y
	}

	return plot;
}

function next(){
	var d = []
	d.push({
		Cl:Math.random(),
		F:Math.random(),
		OH:Math.random(),
		label:'point'
	})
	tp.data(d, function(d){ return [d.Cl, d.F, d.OH]}, 'label');
}



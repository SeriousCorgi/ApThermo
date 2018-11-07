//
SiO2=0.2;Ce2O3=0.2;FeO=0.1;
MgO=0.3;MnO=0;Na2O=0.2;SrO=0.01;
totalOnum=25; 
// coefficeints for calculation: atomic mass of elements/compounds 
MASSF=19;MASSCl=35.45;MASSH2O= 16+1*2;
MASSCaO=56.08;MASSP2O5=141.94;
MASSSO3=80.06;MASSCO2=44;
MASSSiO2=60.08;MASSCe2O3=328.24;
MASSFeO=71.85;MASSMgO=(24.31+16);
MASSMnO=70.94;MASSNa2O=61.98;
MASSSrO=103.62;
totalOnum = 25;

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
		var f  = $('#f').val();
		sessionStorage.setItem("f", f);
		var cl  = $('#cl').val();
		sessionStorage.setItem("cl", cl);
		var h2o  = $('#h2o').val();
		sessionStorage.setItem("h2o", h2o);
		var co2  = $('#co2').val();
		sessionStorage.setItem("co2", co2);
		var t  = $('#t').val();
		sessionStorage.setItem("t", t);
		var p  = $('#p').val();
		sessionStorage.setItem("p", p);
		var f2 = $('#f2').val();
		sessionStorage.setItem("f2", f2);
		var cl2  = $('#cl2').val();
		sessionStorage.setItem("cl2", cl2);
		var h2o2 = $('#h2o2').val();
		sessionStorage.setItem("h2o2", h2o2);
		var co22 = $('#co22').val();
		sessionStorage.setItem("co22", co22);
		var cao = $('#cao').val();
		sessionStorage.setItem("cao", cao);
		var p2o5 = $('#p2o5').val();
		sessionStorage.setItem("p2o5", p2o5);
		var so3 = $('#so3').val();
		sessionStorage.setItem("so3", so3);
		var sio2 = $('#sio2').val();
		sessionStorage.setItem("sio2", sio2);
		var na2o = $('#na2o').val();
		sessionStorage.setItem("na2o", na2o);
		var mgo = $('#mgo').val();
		sessionStorage.setItem("mgo", mgo);
		var al2o3 = $('#al2o3').val();
		sessionStorage.setItem("al2o3", al2o3);
		var mno = $('#mno').val();
		sessionStorage.setItem("mno", mno);
		var feo = $('#feo').val();
		sessionStorage.setItem("feo", feo);
		var fe2o3 = $('#fe2o3').val();
		sessionStorage.setItem("fe2o3", fe2o3);
		var ce2o3 = $('#ce2o3').val();
		sessionStorage.setItem("ce2o3", ce2o3);
		var sro = $('#sro').val();
		sessionStorage.setItem("sro", sro);
		var bao = $('#bao').val();
		sessionStorage.setItem("bao", bao);

	    if(!isNaN(parseFloat(f)) && !isNaN(parseFloat(cl)) && !isNaN(parseFloat(t)) && !isNaN(parseFloat(p)) && !isNaN(parseFloat(cao)) && !isNaN(parseFloat(p2o5))){
	    	location.href='hung_output.html';
	    }else{
	    	alert("Please fill in the Required fields!!");
	    }
	});

	$(".Calculate").click(function(e) {
		// required
		var FAp = parseFloat($('#f').val());
		var ClAp = parseFloat($('#cl').val());
		var cao = parseFloat($('#cao').val());
		var p2o5 = parseFloat($('#p2o5').val());
		// optional
		var h2o;
		if (isNaN(h2o = parseFloat($('#h2o').val()))){
			h2o = 0;
		}
		var co2;
		if (isNaN(co2 = parseFloat($('#co2').val()))){
			co2 = 0;
		}
		var so3;
		if (isNaN(so3 = parseFloat($('#so3').val()))){
			so3 = 0;
		}
		var sio2;
		if (isNaN(sio2 = parseFloat($('#sio2').val()))){
			sio2 = 0;
		}
		var na2o;
		if (isNaN(na2o = parseFloat($('#na2o').val()))){
			na2o = 0;
		}
		var mgo;
		if (isNaN(mgo = parseFloat($('#mgo').val()))){
			mgo = 0;
		}
		var al2o3;
		if (isNaN(al2o3 = parseFloat($('#al2o3').val()))){
			al2o3 = 0;
		}
		var mno;
		if (isNaN(mno = parseFloat($('#mno').val()))){
			mno = 0;
		}
		var feo;
		if (isNaN(feo = parseFloat($('#feo').val()))){
			feo = 0;
		}
		var fe2o3;
		if (isNaN(fe2o3 = parseFloat($('#fe2o3').val()))){
			fe2o3 = 0;
		}
		var ce2o3;
		if (isNaN(ce2o3 = parseFloat($('#ce2o3').val()))){
			ce2o3 = 0;
		}
		var sro;
		if (isNaN(sro = parseFloat($('#sro').val()))){
			sro = 0;
		}
		var bao;
		if (isNaN(bao = parseFloat($('#bao').val()))){
			bao = 0;
		}

		if(!isNaN(FAp) && !isNaN(ClAp) && !isNaN(cao) && !isNaN(p2o5)) {
			// Stoichiometry Calculation
			var mF = FAp/MASSF;
			var mCl = ClAp/MASSCl; 
			var mCaO = cao/MASSCaO;
			var mP2O5 = p2o5/MASSP2O5; 
			var mSO3 = so3/MASSSO3;
			var mCO2 = co2/MASSCO2;
			var mSiO2 = sio2/MASSSiO2;
			var mCe2O3 = ce2o3/MASSCe2O3;
			var mFeO = feo/MASSFeO;
			var mMgO = mgo/MASSMgO;
			var mMnO = mno/MASSMnO;
			var mNa2O = na2o/MASSNa2O;
			var mSrO = sro/MASSSrO;
			var total_oxygen =  (mCaO+ mP2O5*5 + mSO3*3 + mCO2*2 + mSiO2*2 + mCe2O3*3 + mFeO + mMgO + mMnO + mNa2O + mSrO) - 0.5*(mF+mCl);
			var oxygen_factor =  totalOnum/total_oxygen;

			// Ca site
			var nCa = mCaO*oxygen_factor;
			var nFe = mFeO*oxygen_factor;
			var nMg = mMgO*oxygen_factor;
			var nMn = mMnO*oxygen_factor;
			var nNa = mNa2O*oxygen_factor *2;
			var nSr = mSrO*oxygen_factor;
			var nCe = mCe2O3*oxygen_factor*2;
			var total_Casite =  nCa + nFe + nMg + nMn + nNa + nSr + nCe;

			// P site
			var nP = mP2O5*oxygen_factor*2;
			var nSi = mSiO2*oxygen_factor;
			var nS = mSO3*oxygen_factor;
			var nC = mCO2*oxygen_factor;
			var total_Psite =  nP + nSi + nS + nC;
			var CaOverP = total_Casite/total_Psite;
			var bias = (CaOverP-5/3)/(5/3);

			// When H2O is measured
			var mF =  FAp/MASSF;
			var moh =  2* h2o/MASSH2O; // if the box of H2O(m) is not filled, take H2OAp  = 0;
			var mCl =  ClAp/MASSCl;
			var TotalMolar = mF + moh + mCl;
			var x_f_m = mF/TotalMolar;
			var x_oh_m = moh/TotalMolar;
			var x_cl_m = mCl/TotalMolar;

			// When H2O is not measured
			var nF = mF*oxygen_factor;
			var nCl = mCl*oxygen_factor;
			var total_Xsite =  nF + nCl;
			var nOH_c = 2 - total_Xsite;
			var x_f_c =  nF/2;
			var x_cl_c =  nCl/2;
			var x_oh_c =  nOH_c/2;

			// Output
			if (moh == 0){
				var x_f = x_f_m;
				var x_cl = x_cl_m;
				var x_oh = x_oh_m;
			}else{
				var x_f = x_f_c;
		    	var x_cl = x_cl_c;
		    	var x_oh = x_oh_c; 
			}
					
			// Display
			$("#ca_out").html(Math.round(total_Casite * 1000) / 1000);	
			$("#p_out").html(Math.round(total_Psite * 1000) / 1000);	
			$("#f_out").html(Math.round(FAp * 1000) / 1000);	
			$("#cl_out").html(Math.round(ClAp * 1000) / 1000);
			$("#xf").html(Math.round(x_f * 1000) / 1000);
			$("#xcl").html(Math.round(x_cl * 1000) / 1000);
			$("#xoh_m").html(Math.round(x_oh_m * 1000) / 1000);
			$("#xoh_c").html(Math.round(x_oh_c * 1000) / 1000);

			next(x_f, x_cl, x_oh);
		}else {
			alert("Please fill in the required field above!");
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
				return 'translate(' + (10 + coord2[0]) + ',' + (20 + coord2[1]) + ')'
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
		var a = arr[0], b = arr[1], c = arr[2]; 
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

function next(x_f, x_cl, x_oh){
	var d = []
	d.push({
		Cl: x_cl,
		F: x_f,
		OH: x_oh,
		label:'point'
	})
	tp.data(d, function(d){ return [d.Cl, d.OH, d.F]}, 'label');
}



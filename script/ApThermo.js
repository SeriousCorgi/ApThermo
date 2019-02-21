//
SiO2=0;Ce2O3=0;FeO=0;
MgO=0;MnO=0;Na2O=0;SrO=0;
// coefficeints for calculation: atomic mass of elements/compounds
MASSF=19;MASSCl=35.45;MASSH2O= 16+1*2;
MASSCaO=56.08;MASSP2O5=141.94;
MASSSO3=80.06;MASSCO2=44;
MASSSiO2=60.08;MASSCe2O3=328.24;
MASSFeO=71.85;MASSMgO=(24.31+16);
MASSMnO=70.94;MASSNa2O=61.98;
MASSSrO=103.62;
totalOnum = 26;

$(function() {
	var plot_opts = {
		side: 400,
		margin: {top:70,left:150,bottom:150,right:150},
		axis_labels:['OH','F','Cl'],
		axis_ticks:d3.range(0, 101, 20),
		minor_axis_ticks:d3.range(0, 101, 5)
	};
	tp = ternaryPlot( '#plot', plot_opts );

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
		//var fe2o3;
		//if (isNaN(fe2o3 = parseFloat($('#fe2o3').val()))){
			//fe2o3 = 0;
		//}
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
			mF = FAp/MASSF;
			mCl = ClAp/MASSCl;
			mCaO = cao/MASSCaO;
			mP2O5 = p2o5/MASSP2O5;
			mSO3 = so3/MASSSO3;
			mCO2 = co2/MASSCO2;
			mSiO2 = sio2/MASSSiO2;
			mCe2O3 = ce2o3/MASSCe2O3;
			mFeO = feo/MASSFeO;
			mMgO = mgo/MASSMgO;
			mMnO = mno/MASSMnO;
			mNa2O = na2o/MASSNa2O;
			mSrO = sro/MASSSrO;
			total_oxygen =  (mCaO+ mP2O5*5 + mSO3*3 + mCO2*2 + mSiO2*2 + mCe2O3*3 + mFeO + mMgO + mMnO + mNa2O + mSrO) + (mF+mCl)/2;
			oxygen_factor =  totalOnum/total_oxygen;
			// Ca site
			nCa = mCaO*oxygen_factor;
			nFe = mFeO*oxygen_factor;
			nMg = mMgO*oxygen_factor;
			nMn = mMnO*oxygen_factor;
			nNa = mNa2O*oxygen_factor *2;
			nSr = mSrO*oxygen_factor;
			nCe = mCe2O3*oxygen_factor*2;
			total_Casite =  nCa + nFe + nMg + nMn + nNa + nSr + nCe;

			// P site
			nP = mP2O5*oxygen_factor*2;
			nSi = mSiO2*oxygen_factor;
			nS = mSO3*oxygen_factor;
			nC = mCO2*oxygen_factor;
			total_Psite =  nP + nSi + nS + nC;
			CaOverP = total_Casite/total_Psite;
			bias = (CaOverP-5/3)/(5/3);

			// When H2O is measured
			mF =  FAp/MASSF;
			moh =  2* h2o/MASSH2O; // if the box of H2O(m) is not filled, take H2OAp  = 0;
			mCl =  ClAp/MASSCl;
			TotalMolar = mF + moh + mCl;
			x_f_m = mF/TotalMolar;
			x_oh_m = moh/TotalMolar;
			x_cl_m = mCl/TotalMolar;

			// When H2O is not measured
			nF = mF*oxygen_factor;
			nCl = mCl*oxygen_factor;
			total_Xsite =  nF + nCl;
			nOH_c = 2 - total_Xsite;
			x_f_c =  nF/2;
			x_cl_c =  nCl/2;
			x_oh_c =  nOH_c/2;

			// Output
			if (moh != 0){
				x_f = x_f_m;
				x_cl = x_cl_m;
				x_oh = x_oh_m;
				x_oh_m = 1 - (Math.round(x_f * 1000) / 1000 + Math.round(x_cl * 1000) / 1000);
				$("#xoh_m").html(Math.round(x_oh_m * 1000) / 1000);
			}else{
				$("#xoh_m").html('#');
				x_f = x_f_c;
				x_cl = x_cl_c;
				x_oh = x_oh_c;
			}
			H2O_c = (x_oh_c/2)/x_f * MASSH2O/MASSF;

			x_oh_c = 1 - (Math.round(x_f * 1000) / 1000 + Math.round(x_cl * 1000) / 1000);

			// Display
			$("#ca_out").html(Math.round(nCa * 1000) / 1000);
			$("#p_out").html(Math.round(nP * 1000) / 1000);
			$("#f_out").html(Math.round(nF * 1000) / 1000);
			$("#cl_out").html(Math.round(nCl * 1000) / 1000);
			$("#xf").html(Math.round(x_f * 1000) / 1000);
			$("#xcl").html(Math.round(x_cl * 1000) / 1000);
			$("#xoh_c").html(Math.round(x_oh_c * 1000) / 1000);
			//$("#H2O_c").html(Math.round(H2O_c * 1000) / 1000);

			if (x_oh < 0){ x_oh = 0; }
			next(x_f, x_cl, x_oh);
		}else {
			alert("Please fill in the required field above!");
		}
	});

	$(".Compute1").click(function(e) {
		FAp  = parseFloat($('#f').val());
		ClAp  = parseFloat($('#cl').val());
		CO2Ap  = parseFloat($('#co2').val());
		T  = parseFloat($('#t').val());
		// var P  = parseFloat($('#p').val());
		vol_co2 = parseFloat($('#co22').val());
		cao = parseFloat($('#cao').val());
		p2o5 = parseFloat($('#p2o5').val());
		so3 = parseFloat($('#so3').val());
		sio2 = parseFloat($('#sio2').val());
		na2o = parseFloat($('#na2o').val());
		mgo = parseFloat($('#mgo').val());
		al2o3 = parseFloat($('#al2o3').val());
		mno = parseFloat($('#mno').val());
		feo = parseFloat($('#feo').val());
		//var fe2o3 = parseFloat($('#fe2o3').val());
		ce2o3 = parseFloat($('#ce2o3').val());
		sro = parseFloat($('#sro').val());
		bao = parseFloat($('#bao').val());
		H2OAp  = parseFloat($('#h2o').val());

	    if (typeof x_oh_m == "undefined"){
	    	alert("Please Calculate first before Compute");
	    } else if (!isNaN(parseFloat(FAp)) && !isNaN(parseFloat(ClAp)) && !isNaN(parseFloat(T)) && !isNaN(parseFloat(cao)) && !isNaN(parseFloat(p2o5))) {
			if (isNaN(parseFloat(H2OAp))){
				// When H2O is not measured
				H2OAp = H2O_c;
			}
	    	// calculate exchange coefficients of Kd_OHCl,Kd_OHF, Kd_ClF
	    	R=8.314; // gas constant
	    	T_K=T+273.15; // Convert T_C to Kelvin
	    	deltaG_ClOH = 72.9-0.034*T_K; // ERROR: k:0.002 ; b:2.7
	    	deltaG_FOH = 94.6-0.04*T_K; // ERROR: k:0.005 ; b:6.9
	    	Wg_ClOH=5; // calculated Wg of Cl-OH, kJ/mol
	    	Wg_FCl=16; // calculated Wg of F-Cl, kJ/mol
	    	Wg_FOH=7; // calculated Wg of F-OH, kJ/mol

	    	// calculate mole fraction of FAp, HAp, ClAp
	    	MassCl=35.45; // molar mass of Cl
	    	MassF=18.998; // molar mass of Cl
	    	MassH2O=18.015; // molar mass of h2o

	    	if (isNaN(x_oh_m) || x_oh_m == 0){
	    		x_oh = x_oh_c;
	    	} else {
	    		x_oh = x_oh_m;
	    	}
	    	// Output coefficients
	    	Kd_OHCl= Math.exp((1000*(-deltaG_ClOH-((x_cl-x_oh)*Wg_ClOH+x_f*(Wg_FOH-Wg_FCl))))/(R*T_K));
	    	Kd_OHF = Math.exp(1000*(-deltaG_FOH-((x_f-x_oh)*Wg_FOH+x_cl*(Wg_ClOH-Wg_FCl)))/(R*T_K));
	    	Kd_ClF = Kd_OHF/Kd_OHCl;
	    	gammaOH= Math.exp(1000*((x_cl*(1-x_oh)*Wg_ClOH+x_f*(1-x_oh)*Wg_FOH-x_cl*x_f*Wg_FCl))/(R*T_K));
	    	gammaF = Math.exp(1000*((x_cl*(1-x_f)*Wg_FCl+x_oh*(1-x_f)*Wg_FOH-x_cl*x_oh*Wg_ClOH))/(R*T_K));
	    	gammaCl= Math.exp(1000*((x_oh*(1-x_cl)*Wg_ClOH+x_f*(1-x_cl)*Wg_FCl-x_f*x_oh*Wg_FOH))/(R*T_K));
	    	// Output volatiles in magmas
	    	// row3: H2O calculated using Kd(OH-Cl) (1)
	    	// calculate mole OH in melt and total H2O in wt//
	    	OHCl_melt=(x_oh/x_cl)/Kd_OHCl; // melt OH/Cl in molar ratios
	    	OHF_melt=(x_oh/x_f)/Kd_OHF; // melt OH/F in molar ratios
	    	ClF_melt = (x_cl/x_f)/Kd_ClF; // melt Cl/F in molar ratios

	    	moleOHCl = OHCl_melt;
	    	moleOHF = OHF_melt;
	    	moleClF = ClF_melt;

	    	$("#Kd_OHCl").html(Math.round(Kd_OHCl*1000)/1000);
	    	$("#Kd_OHF").html(Math.round(Kd_OHF*10000)/10000);
	    	$("#Kd_ClF").html(Math.round(Kd_ClF*1000)/1000);
	    	$("#gammaOH").html(Math.round(gammaOH*100)/100);
	    	$("#gammaF").html(Math.round(gammaF*100)/100);
	    	$("#gammaCl").html(Math.round(gammaCl*100)/100);

	    	$("#moleOHCl").html(Math.round(moleOHCl*100)/100);
	    	$("#moleOHF").html(Math.round(moleOHF*100)/100);
	    	$("#moleClF").html(Math.round(moleClF*100)/100);

	    	// location.href='hung_output.html';
	    }else{
	    	alert("Please fill in the Required fields!!");
	    }
	});

	$(".Compute2").click(function(e) {
		if (typeof x_oh_m == "undefined"){
			alert("Please Calculate first before Compute");
		} else if (!isNaN(parseFloat(FAp)) && !isNaN(parseFloat(ClAp)) && !isNaN(parseFloat(T)) && !isNaN(parseFloat(cao)) && !isNaN(parseFloat(p2o5))) {
			MeltF = parseFloat($('#f2').val());
			MeltCl  = parseFloat($('#cl2').val());

			meanM=33; // molar mass of studied melt
			moleCl_melt =((MeltCl/10000)/MassCl)/(100/meanM); // mole Cl in melt (input Cl in ppm)
			moleOH_melt1 = moleCl_melt*OHCl_melt
			moleF_melt =((MeltF/10000)/MassF)/(100/meanM); // mole F in melt (input F in ppm)
			moleOH_melt2 = moleF_melt*OHF_melt;

	    	// solve equation that involves moleOH and total H2O using Cl
	    	// k2 = Math.exp(0.641 - 2704.4/T_K);
	    	k2 = 6.53 * Math.exp(-3100/T_K);

	    	//eqn1=moleOH_melt1==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	    	//m1=solve(eqn1,x);// m is the solution of equation= total mole water in melt
	    	m1 = eqn1(moleOH_melt1);
	    	moleH2O_melt1 = m1;
	    	console.log();
	    	//moleH2O_melt1=Math.min(Math.eval(m1));// choose the smaller value of the 2 solutions; The larger solution is >50wt.//
	    	// convert total mole water to total water in wt//
	    	//eqn3=moleH2O_melt1 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	    	//n1=solve(eqn3,x); // n is the solution of equation=mass fraction of total water in melt
	    	n1 = eqn2(moleH2O_melt1);
	    	MeltWater1=n1*100; // calculated using Kd(OH-Cl)

	    	// row4: H2O calculated using Kd(OH-F) (2)
	    	// solve equation that involves moleOH and total H2O using F
	    	//eqn2=moleOH_melt2==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	    	//m2=solve(eqn2,x);
	    	m2 = eqn1(moleOH_melt2);
	    	moleH2O_melt2 = m2;
	    	//moleH2O_melt2=Math.min(Math.eval(m2));
	    	//eqn4=moleH2O_melt2 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	    	//n2=solve(eqn4,x);
	    	n2 = eqn2(moleH2O_melt2);
	    	MeltWater2=n2*100; // calcuated using Kd(OH-F)

	    	// row5: calcualted CO2 (1)
	    	KD = 0.629;
	    	MeltCO2_1 = MeltWater1/((H2OAp/CO2Ap)/KD)*10000;

			// row6: calculated CO2 (2)
			MeltCO2_2 = MeltWater2/((H2OAp/CO2Ap)/KD)*10000;

	    	// $("#compute_output").html(html);

	    	$("#MeltWater1").html(Math.round(MeltWater1*10)/10);
	    	$("#MeltWater2").html(Math.round(MeltWater2*10)/10);
			// $("#MeltCO2_1").html(Math.round(MeltCO2_1));
			// $("#MeltCO2_2").html(Math.round(MeltCO2_2));
	    	checkMissing();
	    }
	});
})


function ternaryPlot(selector, userOpt ) {

	var plot = {
		dataset:[]
	};

	var opt = {
		width:600,
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
	tp.data(d, function(d){ return [d.OH, d.F, d.Cl]}, 'label');
}


function eqn1(mole){
	var e = 0.00001;
	for (r = -3500; r <= 1000000; r++){
		x = r/100000;
		var ans = 2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x*x+k2-4*x*k2+4*x*x*k2))/(k2-4);
		if (Math.abs(ans - mole) <= e){
			return x;
		}
	}
}

function eqn2(mole){
	var e = 0.00001;
	for (r = -3500; r <= 1000000; r++){
		x = r/100000;
		ans = (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
		if (Math.abs(ans - mole) <= e){
			return x;
		}
	}
}

function k2_1() {
	k2 = 6.53 * Math.exp(-3100/T_K);

	//eqn1=moleOH_melt1==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	//m1=solve(eqn1,x);// m is the solution of equation= total mole water in melt
	m1 = eqn1(moleOH_melt1);
	moleH2O_melt1 = m1;
	console.log();
	//moleH2O_melt1=Math.min(Math.eval(m1));// choose the smaller value of the 2 solutions; The larger solution is >50wt.//
	// convert total mole water to total water in wt//
	//eqn3=moleH2O_melt1 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	//n1=solve(eqn3,x); // n is the solution of equation=mass fraction of total water in melt
	n1 = eqn2(moleH2O_melt1);
	MeltWater1=n1*100; // calculated using Kd(OH-Cl)

	// row4: H2O calculated using Kd(OH-F) (2)
	// solve equation that involves moleOH and total H2O using F
	//eqn2=moleOH_melt2==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	//m2=solve(eqn2,x);
	m2 = eqn1(moleOH_melt2);
	moleH2O_melt2 = m2;
	//moleH2O_melt2=Math.min(Math.eval(m2));
	//eqn4=moleH2O_melt2 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	//n2=solve(eqn4,x);
	n2 = eqn2(moleH2O_melt2);
	MeltWater2=n2*100; // calcuated using Kd(OH-F)

	// row5: calcualted CO2 (1)
	KD = 0.629;
	MeltCO2_1 = MeltWater1/((H2OAp/CO2Ap)/KD)*10000;

	// row6: calculated CO2 (2)
	MeltCO2_2 = MeltWater2/((H2OAp/CO2Ap)/KD)*10000;

	$("#MeltWater1").html(Math.round(MeltWater1*10)/10);
	$("#MeltWater2").html(Math.round(MeltWater2*10)/10);
	// $("#MeltCO2_1").html(Math.round(MeltCO2_1));
	// $("#MeltCO2_2").html(Math.round(MeltCO2_2));

	checkMissing();
}

function k2_2() {
	k2 = Math.exp(0.641 - 2704.4/T_K);

	//eqn1=moleOH_melt1==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	//m1=solve(eqn1,x);// m is the solution of equation= total mole water in melt
	m1 = eqn1(moleOH_melt1);
	moleH2O_melt1 = m1;
	console.log();
	//moleH2O_melt1=Math.min(Math.eval(m1));// choose the smaller value of the 2 solutions; The larger solution is >50wt.//
	// convert total mole water to total water in wt//
	//eqn3=moleH2O_melt1 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	//n1=solve(eqn3,x); // n is the solution of equation=mass fraction of total water in melt
	n1 = eqn2(moleH2O_melt1);
	MeltWater1=n1*100; // calculated using Kd(OH-Cl)

	// row4: H2O calculated using Kd(OH-F) (2)
	// solve equation that involves moleOH and total H2O using F
	//eqn2=moleOH_melt2==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	//m2=solve(eqn2,x);
	m2 = eqn1(moleOH_melt2);
	moleH2O_melt2 = m2;
	//moleH2O_melt2=Math.min(Math.eval(m2));
	//eqn4=moleH2O_melt2 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	//n2=solve(eqn4,x);
	n2 = eqn2(moleH2O_melt2);
	MeltWater2=n2*100; // calcuated using Kd(OH-F)

	// row5: calcualted CO2 (1)
	KD = 0.629;
	MeltCO2_1 = MeltWater1/((H2OAp/CO2Ap)/KD)*10000;

	// row6: calculated CO2 (2)
	MeltCO2_2 = MeltWater2/((H2OAp/CO2Ap)/KD)*10000;

	$("#MeltWater1").html(Math.round(MeltWater1*10)/10);
	$("#MeltWater2").html(Math.round(MeltWater2*10)/10);
	// $("#MeltCO2_1").html(Math.round(MeltCO2_1));
	// $("#MeltCO2_2").html(Math.round(MeltCO2_2));

	checkMissing();
}

function checkMissing() {
	if (isNaN(MeltF) && isNaN(MeltCl)){
		$("#missing").html("Check the input box(es) marked in red color");
		$("#f2").css("border", "2px solid red");
		$("#cl2").css("border", "2px solid red");
		$("#MeltWater1").html("#");
		$("#MeltWater2").html("#");
	} else if (isNaN(MeltCl)) {
		$("#missing").html("");
		$("#f2").css("border", "");
		$("#cl2").css("border", "");
		$("#MeltWater1").html("#");
	} else if (isNaN(MeltF)) {
		$("#missing").html("");
		$("#f2").css("border", "");
		$("#cl2").css("border", "");
		$("#MeltWater2").html("#");
	} else{
		$("#missing").html("");
		$("#f2").css("border", "");
		$("#cl2").css("border", "");
	}

	// if (MeltCl > 20) {
	// 	$("#MeltWater1").html("#");
	// } else if (MeltF > 20)
	// 	$("#MeltWater2").html("#");
	// }
}

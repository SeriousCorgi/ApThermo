function id(id){
	return document.getElementById(id);
}

$(function() {
	$(".Back").click(function() {
	    location.href='hung_input.html';
	});

	FAp = parseFloat(sessionStorage.getItem("f"));
	ClAp = parseFloat(sessionStorage.getItem("cl"));
	T = parseFloat(sessionStorage.getItem("t"));
	P = parseFloat(sessionStorage.getItem("p"));
	H2OAp = parseFloat(sessionStorage.getItem("h2o"));
	if (isNaN(CO2Ap = parseFloat(sessionStorage.getItem("co2")))){
		CO2Ap = 0.01;
	}
	if (isNaN(MeltF = parseFloat(sessionStorage.getItem("f2")))){
		MeltF = 1000;
	}
	if (isNaN(MeltCl = parseFloat(sessionStorage.getItem("cl2")))){
		MeltCl = 2500;
	}
	if (isNaN(vol_h2o = parseFloat(sessionStorage.getItem("h2o2")))){
		vol_h2o = 4;
	}
	if (isNaN(vol_co2 = parseFloat(sessionStorage.getItem("co22")))){
		vol_co2 = 500;
	}

	$("#f").html(FAp);	
	$("#cl").html(ClAp);	
	$("#h2o").html(H2OAp);	
	$("#co2").html(CO2Ap);	
	$("#t").html(T);	
	$("#p").html(P);	
	$("#f2").html(MeltF);	
	$("#cl2").html(MeltCl);	
	$("#h2o2").html(vol_h2o);	
	$("#co22").html(vol_co2);	


	// calculate exchange coefficients of Kd_OHCl,Kd_OHF, Kd_ClF
	R=8.314; // gas constant
	T_K=T+273.15; // Convert T_C to Kelvin
	deltaG_ClOH = 52.4-0.02*T_K + 0.00017*(P*10-1); // ERROR: k:0.002 ; b:2.7
	deltaG_FOH = 70.4-0.03*T_K + 0.00057*(P*10-1); // ERROR: k:0.005 ; b:6.9
	Wg_ClOH=18.3; // calculated Wg of Cl-OH, kJ/mol
	Wg_FCl=6.8; // calculated Wg of F-Cl, kJ/mol
	Wg_FOH=3.56; // calculated Wg of F-OH, kJ/mol

	// calculate mole fraction of FAp, HAp, ClAp
	MassCl=35.45; // molar mass of Cl
	MassF=18.998; // molar mass of Cl
	MassH2O=18.015; // molar mass of h2o
	f_molar= FAp/MassF;
	oh_molar= H2OAp/MassH2O*2;
	cl_molar= ClAp/MassCl;
	TotalMolar = f_molar + oh_molar + cl_molar;
	x_f=f_molar/TotalMolar;
	x_oh=oh_molar/TotalMolar;
	x_cl=cl_molar/TotalMolar;

	// Output coefficients
	Kd_OHCl= Math.exp((1000*(-deltaG_ClOH-((x_cl-x_oh)*Wg_ClOH+x_f*(Wg_FOH-Wg_FCl))))/(R*T_K));
	$("#Kd_OHCl").html(Math.round(Kd_OHCl*1000)/1000);
	Kd_OHF = Math.exp(1000*(-deltaG_FOH-((x_f-x_oh)*Wg_FOH+x_cl*(Wg_ClOH-Wg_FCl)))/(R*T_K));
	$("#Kd_OHF").html(Math.round(Kd_OHF*1000)/1000);
	Kd_ClF = Kd_OHF/Kd_OHCl;
	$("#Kd_ClF").html(Math.round(Kd_ClF*1000)/1000);
	gammaOH= Math.exp(1000*((x_cl*(1-x_oh)*Wg_ClOH+x_f*(1-x_oh)*Wg_FOH-x_cl*x_f*Wg_FCl))/(R*T_K));
	$("#gammaOH").html(Math.round(gammaOH*1000)/1000);
	gammaF = Math.exp(1000*((x_cl*(1-x_f)*Wg_FCl+x_oh*(1-x_f)*Wg_FOH-x_cl*x_oh*Wg_ClOH))/(R*T_K));
	$("#gammaF").html(Math.round(gammaF*1000)/1000);
	gammaCl= Math.exp(1000*((x_oh*(1-x_cl)*Wg_ClOH+x_f*(1-x_cl)*Wg_FCl-x_f*x_oh*Wg_FOH))/(R*T_K));
	$("#gammaCl").html(Math.round(gammaCl*1000)/1000);
	// Output volatiles in magmas
	$("#MeltF").html(MeltF); // row1
	$("#MeltCl").html(MeltCl); // row2

	// row3: H2O calculated using Kd(OH-Cl) (1)
	// calculate mole OH in melt and total H2O in wt//  
	OHCl_melt=(x_oh/x_cl)/Kd_OHCl; // melt OH/Cl in molar ratios
	OHF_melt=(x_oh/x_f)/Kd_OHF; // melt OH/F in molar ratios
	ClF_melt = (x_cl/x_f)/Kd_ClF; // melt Cl/F in molar ratios

	meanM=33.82; // molar mass of studied melt
	moleCl_melt =((MeltCl/10000)/MassCl)/(100/meanM); // mole Cl in melt (input Cl in ppm)
	moleOH_melt1 = moleCl_melt*OHCl_melt
	moleF_melt =((MeltF/10000)/MassF)/(100/meanM); // mole F in melt (input F in ppm)
	moleOH_melt2 = moleF_melt*OHF_melt;

	//massOHCl = ;
	//massOHF = ;
	//massCl = ;

	// solve equation that involves moleOH and total H2O using Cl
	k2=Math.exp(1.49-2634/T_K);
	//eqn1=moleOH_melt1==2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x^2+k2-4*x*k2+4*x^2*k2))/(k2-4);
	//m1=solve(eqn1,x);// m is the solution of equation= total mole water in melt
	m1 = eqn1(moleOH_melt1);
	moleH2O_melt1 = m1;
	//moleH2O_melt1=Math.min(Math.eval(m1));// choose the smaller value of the 2 solutions; The larger solution is >50wt.// 
	// convert total mole water to total water in wt// 
	//eqn3=moleH2O_melt1 == (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
	//n1=solve(eqn3,x); // n is the solution of equation=mass fraction of total water in melt
	n1 = eqn2(moleH2O_melt1);
	console.log(n1);
	MeltWater1=n1*100; // calculated using Kd(OH-Cl)
	$("#MeltWater1").html(MeltWater1);

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
	$("#MeltWater2").html(MeltWater2);

	// row5: calcualted CO2 (1)
	KD = 0.629;
	MeltCO2_1 = MeltWater1/((H2OAp/CO2Ap)/KD)*10000;
	$("#MeltCO2_1").html(Math.round(MeltCO2_1));

	// row6: calculated CO2 (2)
	MeltCO2_2 = MeltWater2/((H2OAp/CO2Ap)/KD)*10000;
	$("#MeltCO2_2").html(Math.round(MeltCO2_2));
})

function eqn1(mole){
	var e = 0.00001;
	for (r = 0; r <= 10000; r++){
		x = r/100000;
		var ans = 2*x+(8*x+k2-2*x*k2-Math.sqrt(k2)*Math.sqrt(16*x-16*x*x+k2-4*x*k2+4*x*x*k2))/(k2-4);
		if (Math.abs(ans - mole) <= e){
			return x;
		}
	}
}

function eqn2(mole){
	var e = 0.00001;
	for (r = 0; r <= 10000; r++){
		x = r/100000;
		ans = (x/MassH2O)/(x/MassH2O+(1-x)/meanM);
		if (Math.abs(ans - mole) <= e){
			return x;
		}
	}
}

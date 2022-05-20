Texture2D textureDay : register(t0);
Texture2D textureEvening : register(t1);
Texture2D textureNight : register(t2);

SamplerState colorSampler : register(s0);

cbuffer MatrixBuffer : register(b0)
{
	matrix worldMatrix;
	matrix viewMatrix;
	matrix projMatrix;
	float4 valores;
};

cbuffer time : register(b1)
{
	float time;
};

struct VS_Input
{
	float4 pos : POSITION;
	float2 tex0 : TEXCOORD0;
};

struct PS_Input
{
	float4 pos : SV_POSITION;
	float2 tex0 : TEXCOORD0;
	float time : TEXCOORD1;
};

PS_Input VS_Main(VS_Input vertex)
{
	PS_Input vsOut = (PS_Input)0;
	vsOut.pos = mul(vertex.pos, worldMatrix);
	vsOut.pos = mul(vsOut.pos, viewMatrix);
	vsOut.pos = mul(vsOut.pos, projMatrix);
	vsOut.time = time;
	vsOut.tex0 = vertex.tex0;

	return vsOut;
}

float4 PS_Main(PS_Input pix) : SV_TARGET
{
	float4 dayColor = textureDay.Sample(colorSampler, pix.tex0);
	float4 eveningColor = textureEvening.Sample(colorSampler, pix.tex0);
	float4 nightColor = textureNight.Sample(colorSampler, pix.tex0);

	float timeOfDay = pix.time;

	float FFN = timeOfDay;
	float FFE = 1-abs(0.5-timeOfDay)*2;
	float FFD = 1-timeOfDay;

	float4 finalColor = saturate((dayColor * FFD) + (eveningColor* FFE) + (nightColor * FFN));

	return finalColor;
}
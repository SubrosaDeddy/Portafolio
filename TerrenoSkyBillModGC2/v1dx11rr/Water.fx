Texture2D colorMap : register(t0);
Texture2D normalMap : register(t1);
Texture2D displacementMap : register(t2);

SamplerState colorSampler : register(s0);

cbuffer cbChangerEveryFrame : register(b0)
{
	matrix worldMatrix;
};

cbuffer cbNeverChanges : register(b1)
{
	matrix viewMatrix;
};

cbuffer cbChangeOnResize : register(b2)
{
	matrix projMatrix;
};

cbuffer cbChangesOccasionally : register(b3)
{
	float3 cameraPos;
};

cbuffer cbChangesOccasionally : register(b4)
{
	float specForce;
};

cbuffer gener : register(b5)
{
	float4 generales;
};

cbuffer diff : register(b6)
{
	float4 diffLight;
};

cbuffer amb : register(b7)
{
	float4 ambientLight;
};

cbuffer time : register(b8)
{
	float3 time;
};

struct VS_Input
{
	float4 pos : POSITION;
	float2 tex0 : TEXCOORD0;
	float3 normal : NORMAL0;
	float3 tangente : TANGENT0;
};

struct PS_Input
{
	float4 pos : SV_POSITION;
	float2 tex0 : TEXCOORD0;
	float3 normal : TEXCOORD1;
	/*float3 tangente : TEXCOORD2;
	float3 binormal : TEXCOORD3;*/
	float3 generales : TEXCOORD4;
	float3 camPos : TEXCOORD5;
	float3 posi : TEXCOORD6;
	float3 time : TEXCOORD7;
	float4 diffuse : TEXCOORD2;
	float4 ambient : TEXCOORD3;
};

PS_Input VS_Main(VS_Input vertex)
{
	float4 worldPosition;

	float distance = sqrt(pow(vertex.pos.x, 2) + pow(vertex.pos.z, 2));
	vertex.pos.y += sin(distance * 20 - time.x*180*3) / 50;

	PS_Input vsOut = (PS_Input)0;
	vsOut.pos = mul(vertex.pos, worldMatrix);
	vsOut.posi = vsOut.pos.xyz;
	vsOut.pos = mul(vsOut.pos, viewMatrix);
	vsOut.pos = mul(vsOut.pos, projMatrix);
	
	vsOut.tex0 = vertex.tex0;

	worldPosition = mul(vertex.pos, worldMatrix);

	vsOut.normal = normalize(mul(vertex.normal, worldMatrix));

	vsOut.camPos = cameraPos.xyz - worldPosition.xyz;
	vsOut.camPos = normalize(vsOut.camPos);

	vsOut.generales = generales;

	vsOut.diffuse = diffLight;
	vsOut.ambient = ambientLight;
	vsOut.time = time.x;
	return vsOut;
}

float4 PS_Main(PS_Input pix) : SV_TARGET
{
	float3 vecVista = pix.camPos;
	float3 lightDir = normalize(float3(pix.generales.x, pix.generales.y, pix.generales.z)); // lightDirection

	float4 luzDifusa = pix.diffuse;
	float FAD = pix.diffuse.a;
	float4 luzAmbiental = pix.ambient;
	float FAA = pix.ambient.a;

	float4 waterColor = colorMap.Sample(colorSampler, pix.tex0);
	float4 bumpColor = normalMap.Sample(colorSampler, pix.tex0);
	float4 displacementColor = displacementMap.Sample(colorSampler, pix.tex0);

	float3 bump = normalize(2.0 * bumpColor - 1.0);
	bump = mul(bump, pix.normal);

	float FALL = 1-saturate(dot(bump, vecVista));

	//Aportación difusa
	float4 aportDiff = saturate(waterColor * FAD);
	//Aport amb
	float4 aportAmb = saturate(luzAmbiental*FAA);

	if (dot(pix.normal, float3(0,1,0) <= 0))
		clip(-1);

	float4 finalColor = (aportDiff + aportAmb)*FALL;
	finalColor.a = finalColor.a/2+0.5;
	return finalColor;
}
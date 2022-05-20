Texture2D colorMap : register(t0);
Texture2D normalMap : register(t1);
Texture2D specMap : register(t2);

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
	float3 normal : TEXCOORD0;
	float3 camPos : TEXCOORD1;
	float3 posi : TEXCOORD2;
};

PS_Input VS_Main(VS_Input vertex)
{

	float4 worldPosition;

	PS_Input vsOut = (PS_Input)0;
	vsOut.pos = mul(vertex.pos, worldMatrix);
	vsOut.posi = vsOut.pos.xyz;
	vsOut.pos = mul(vsOut.pos, viewMatrix);
	vsOut.pos = mul(vsOut.pos, projMatrix);

	worldPosition = mul(vertex.pos, worldMatrix);

	vsOut.normal = normalize(mul(vertex.normal, worldMatrix));

	vsOut.camPos = cameraPos.xyz - worldPosition.xyz;
	vsOut.camPos = normalize(vsOut.camPos);

	return vsOut;
}

float4 PS_Main(PS_Input pix) : SV_TARGET
{
	float3 vecVista = pix.camPos;

	//Aportación emisiva
	float FAD = 1;
	float4 color = float4(0.68, 0.85, 0.9, 1);

	float FALL = saturate(1-dot(pix.normal, vecVista))*2;

	float4 aportEmisiva = saturate(color * FAD * FALL);
	aportEmisiva.a = FALL;

	return aportEmisiva;
}
#ifndef _dxrr
#define _dxrr
#include <d3d11.h>
#include <d3dx11.h>
#include <d3dx10.h>
#include <d3dx10math.h>
#include "TerrenoRR.h"
#include "Camara.h"
#include "SkyDome.h"
#include "Billboard.h"
#include "ModeloRR.h"
#include "XACT3Util.h"
#include <ctime>
#include <chrono>


class DXRR{	

private:
	int ancho;
	int alto;
public:	
	HINSTANCE hInstance;
	HWND hWnd;

	D3D_DRIVER_TYPE driverType;
	D3D_FEATURE_LEVEL featureLevel;

	ID3D11Device* d3dDevice;
	ID3D11DeviceContext* d3dContext;
	IDXGISwapChain* swapChain;
	ID3D11RenderTargetView* backBufferTarget;

	ID3D11Texture2D* depthTexture;
	ID3D11DepthStencilView* depthStencilView;

	ID3D11DepthStencilState* depthStencilState;
	ID3D11DepthStencilState* depthStencilDisabledState;

	ID3D11BlendState *alphaBlendState, *commonBlendState;

	int frameBillboard;

	TerrenoRR *terreno;
	SkyDome *skydome;
	BillboardRR *billboard;
	BillboardRR *desertMice;
	D3DXVECTOR2 micePositions[100];
	Camara *camara;
	ModeloRR* Worm;
	ModeloRR* Fangs;

	ModeloRR* TheKeep;
	ModeloRR* TheKeepRamp;
	ModeloRR* TheKeepDoorL;
	ModeloRR* TheKeepDoorR;
	ModeloRR* TheKeepColumnL;
	ModeloRR* TheKeepColumnR;
	ModeloRR* TheKeepTorchL;
	ModeloRR* TheKeepTorchR;
	
	ModeloRR* SietchTabrBase;
	ModeloRR* SietchTabrFrontL;
	ModeloRR* SietchTabrFrontR;
	ModeloRR* SietchTabrFrontLBigColumnL;
	ModeloRR* SietchTabrFrontLBigColumnR;
	ModeloRR* SietchTabrFrontLSmallColumnL;
	ModeloRR* SietchTabrFrontLSmallColumnR;
	ModeloRR* SietchTabrFrontRBigColumnL;
	ModeloRR* SietchTabrFrontRBigColumnR;
	ModeloRR* SietchTabrFrontRSmallColumnL;
	ModeloRR* SietchTabrFrontRSmallColumnR;
	ModeloRR* SietchTabrFloor;
	ModeloRR* SietchTabrBalcony;

	ModeloRR* rock[36];


	ModeloRR* Water;

	ModeloRR* Crate;
	ModeloRR* HologramCrate;
	
	float izqder;
	float arriaba;
	D3DXVECTOR3 vel;
	bool breakpoint;
	vector2 uv1[32];
	vector2 uv2[32];
	vector2 uv3[32];
	vector2 uv4[32];

	XACTINDEX cueIndex;
	CXACT3Util m_XACT3;
	
	float dayLength = 14400;
	float hour = 0;

    DXRR(HWND hWnd, int Ancho, int Alto)
	{
		breakpoint = false;
		frameBillboard = 0;
		ancho = Ancho;
		alto = Alto;
		driverType = D3D_DRIVER_TYPE_NULL;
		featureLevel = D3D_FEATURE_LEVEL_11_0;
		d3dDevice = 0;
		d3dContext = 0;
		swapChain = 0;
		backBufferTarget = 0;
		IniciaD3D(hWnd);
		izqder = 0;
		arriaba = 0;
		billCargaFuego();
		camara = new Camara(D3DXVECTOR3(0,80,6), D3DXVECTOR3(0,80,0), D3DXVECTOR3(0,1,0), Ancho, Alto);
		terreno = new TerrenoRR(1000, 1200, d3dDevice, d3dContext);
		skydome = new SkyDome(32, 32, 100.0f, &d3dDevice, &d3dContext, L"SkyDome.png", L"SkyDawn.jpg", L"SkyNight.jpg");

		billboard = new BillboardRR(L"Assets/Billboards/fuego-anim.png",L"Assets/Billboards/fuego-anim-normal.png", d3dDevice, d3dContext, 5);
		desertMice = new BillboardRR(L"Assets/Billboards/Jerb0.png",L"Assets/Billboards/Jerb0Norm.png", d3dDevice, d3dContext, 5);
		for (int i = 0; i < 100; i++)
		{
			micePositions[i].x = (rand() % 1000)-500;
			micePositions[i].y = (rand() % 1000) - 500;
		}
		
		Worm = new ModeloRR(d3dDevice, d3dContext, "Assets/Worm/Worm.obj", L"Assets/Worm/Rock42/Rock_042_BaseColor.jpg", L"Assets/Worm/Rock42/Rock_042_Normal.jpg", L"Assets/Worm/Rock42/Rock_042_Roughness.jpg", -380, 30, L"Modelo.fx");
		Fangs = new ModeloRR(d3dDevice, d3dContext, "Assets/Worm/Fangs.obj", L"Assets/Worm/WhiteText/leather_white_diff_4k.jpg", L"Assets/Worm/Rock42/Rock_042_Normal.jpg", L"Assets/Worm/WhiteText/leather_white_rough_4k.jpg", -380, 30, L"Modelo.fx");
		
		TheKeep = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeep.obj", L"Assets/TheKeep/TheKeep/KeepDiffText.png", L"Assets/TheKeep/TheKeep/KeepNorText.png", L"Assets/TheKeep/TheKeep/KeepRoughText.png", 0, 950, L"Modelo.fx");
		TheKeepRamp = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepRamp.obj", L"Assets/TheKeep/TheKeep/RampDiffText.png", L"Assets/TheKeep/TheKeep/RampNorText.png", L"Assets/TheKeep/TheKeep/RampRoughText.png", 0, 940, L"Modelo.fx");
		TheKeepDoorL = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepDoorLeft.obj", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_basecolor.jpg", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_normal.jpg", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_roughness.jpg", 0, 940, L"Modelo.fx");
		TheKeepDoorR = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepDoorRight.obj", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_basecolor.jpg", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_normal.jpg", L"Assets/TheKeep/WallpaperArtDeco/Wallpaper_ArtDeco_001_roughness.jpg", 0, 940), L"Modelo.fx";
		TheKeepColumnL = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepColumnLeft.obj", L"Assets/TheKeep/TorchColumn/TorchColumnDiffText.png", L"Assets/TheKeep/TorchColumn/TorchColumnNormText.png", L"Assets/TheKeep/TorchColumn/TorcColumnhRoughText.png", 0, 950, L"Modelo.fx");
		TheKeepColumnR = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepColumnRight.obj", L"Assets/TheKeep/TorchColumn/TorchColumnDiffText.png", L"Assets/TheKeep/TorchColumn/TorchColumnNormText.png", L"Assets/TheKeep/TorchColumn/TorcColumnhRoughText.png", 5, 950, L"Modelo.fx");
		TheKeepTorchL = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepTorchLeft.obj", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_basecolor.jpg", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_normal.jpg", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_roughness.jpg", 0, 950, L"Modelo.fx");
		TheKeepTorchR = new ModeloRR(d3dDevice, d3dContext, "Assets/TheKeep/TheKeepTorchRight.obj", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_basecolor.jpg", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_normal.jpg", L"Assets/TheKeep/HammeredMetal/Metal_Hammered_004_roughness.jpg", 5, 950, L"Modelo.fx");
		
		SietchTabrBase = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrBase.obj", L"Assets/SietchTabr/TabrBack/TabrBackDiff.png", L"Assets/SietchTabr/TabrBack/TabrBackNorm.png", L"Assets/SietchTabr/TabrBack/TabrBackRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontL = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontL.obj", L"Assets/SietchTabr/FrontTabr/FrontTabrDiff.png", L"Assets/SietchTabr/FrontTabr/FrontTabrNorm.png", L"Assets/SietchTabr/FrontTabr/FrontTabrRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontR = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontR.obj", L"Assets/SietchTabr/FrontTabr/FrontTabrDiff.png", L"Assets/SietchTabr/FrontTabr/FrontTabrNorm.png", L"Assets/SietchTabr/FrontTabr/FrontTabrRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontLBigColumnL = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontLBigColumnL.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontLBigColumnR = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontLBigColumnR.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontLSmallColumnL = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontLSmallColumnL.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontLSmallColumnR = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontLSmallColumnR.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontRBigColumnL = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontRBigColumnL.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontRBigColumnR = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontRBigColumnR.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontRSmallColumnL = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontRSmallColumnL.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFrontRSmallColumnR = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFrontRSmallColumnR.obj", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnDiff.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnNorm.png", L"Assets/SietchTabr/SietchTabrColumn/TabrColumnRough.png", 0, -450, L"Modelo.fx");
		SietchTabrFloor = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrFloor.obj", L"Assets/SietchTabr/SietchTabrFloor/TabrFloorDIff.png", L"Assets/SietchTabr/SietchTabrFloor/TabrFloorNorm.png", L"Assets/SietchTabr/SietchTabrFloor/TabrFloorRough.png", 0, -450, L"Modelo.fx");
		SietchTabrBalcony = new ModeloRR(d3dDevice, d3dContext, "Assets/SietchTabr/SietchTabrBalcony.obj", L"Assets/SietchTabr/TabrColumnitasBalcon/Stone_Floor_005_basecolor.jpg", L"Assets/SietchTabr/TabrColumnitasBalcon/Stone_Floor_005_normal.jpg", L"Assets/SietchTabr/TabrColumnitasBalcon/Stone_Floor_005_roughness.jpg", 0, -450, L"Modelo.fx");
		
		for (int i = 0; i < 12; i++)
		{
			rock[i] = new ModeloRR(d3dDevice, d3dContext, "Assets/Rock/Rock_7.obj", L"Assets/Rock/Rock_7_Base_Color.jpg", L"Assets/Rock/Rock_7_Normal.jpg", L"Assets/Rock/Rock_7_Specular.jpg", -550, -550+i*100, L"Modelo.fx");
			rock[i+12] = new ModeloRR(d3dDevice, d3dContext, "Assets/Rock/Rock_7.obj", L"Assets/Rock/Rock_7_Base_Color.jpg", L"Assets/Rock/Rock_7_Normal.jpg", L"Assets/Rock/Rock_7_Specular.jpg", 530, -550+i*100, L"Modelo.fx");
			rock[i+24] = new ModeloRR(d3dDevice, d3dContext, "Assets/Rock/Rock_7.obj", L"Assets/Rock/Rock_7_Base_Color.jpg", L"Assets/Rock/Rock_7_Normal.jpg", L"Assets/Rock/Rock_7_Specular.jpg", -505+i*93, -575, L"Modelo.fx");
		}
		
		Crate = new ModeloRR(d3dDevice, d3dContext, "Assets/Crate/Sci-fi Container Game.obj", L"Assets/Crate/Sci-fi_Container_Base_Color.png", L"Assets/Crate/Sci-fi_Containerl_Normal_DirectX.png", L"Assets/Crate/Sci-fi_Container_Mixed_AO.png", -200, 0, L"Modelo.fx");
		HologramCrate = new ModeloRR(d3dDevice, d3dContext, "Assets/Crate/Sci-fi Container Game.obj", L"Assets/Crate/Sci-fi_Container_Base_Color.png", L"Assets/Crate/Sci-fi_Containerl_Normal_DirectX.png", L"Assets/Crate/Sci-fi_Container_Mixed_AO.png",-200, 0, L"Hologram.fx");

		Water = new ModeloRR(d3dDevice, d3dContext, "Assets/Water/Water.obj", L"Assets/Water/SeamlessWaterTexture.jpg", L"Assets/Water/Water_001_NORM.jpg", L"Assets/Water/Water_001_DISP.png", -460, 30, L"Water.fx");

	}

	~DXRR()
	{
		LiberaD3D();
		m_XACT3.Terminate();
	}
	
	bool IniciaD3D(HWND hWnd)
	{
		this->hInstance = hInstance;
		this->hWnd = hWnd;

		//obtiene el ancho y alto de la ventana donde se dibuja
		RECT dimensions;
		GetClientRect(hWnd, &dimensions);
		unsigned int width = dimensions.right - dimensions.left;
		unsigned int heigth = dimensions.bottom - dimensions.top;

		//Las formas en como la pc puede ejecutar el DX11, la mas rapida es D3D_DRIVER_TYPE_HARDWARE pero solo se puede usar cuando lo soporte el hardware
		//otra opcion es D3D_DRIVER_TYPE_WARP que emula el DX11 en los equipos que no lo soportan
		//la opcion menos recomendada es D3D_DRIVER_TYPE_SOFTWARE, es la mas lenta y solo es util cuando se libera una version de DX que no sea soportada por hardware
		D3D_DRIVER_TYPE driverTypes[]=
		{
			D3D_DRIVER_TYPE_HARDWARE, D3D_DRIVER_TYPE_WARP, D3D_DRIVER_TYPE_SOFTWARE
		};
		unsigned int totalDriverTypes = ARRAYSIZE(driverTypes);

		//La version de DX que utilizara, en este caso el DX11
		D3D_FEATURE_LEVEL featureLevels[]=
		{
			D3D_FEATURE_LEVEL_11_0, D3D_FEATURE_LEVEL_10_1, D3D_FEATURE_LEVEL_10_0
		};
		unsigned int totalFeaturesLevels = ARRAYSIZE(featureLevels);

		DXGI_SWAP_CHAIN_DESC swapChainDesc;
		ZeroMemory(&swapChainDesc, sizeof(swapChainDesc));
		swapChainDesc.BufferCount = 1;
		swapChainDesc.BufferDesc.Width = width;
		swapChainDesc.BufferDesc.Height = heigth;
		swapChainDesc.BufferDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM;
		swapChainDesc.BufferDesc.RefreshRate.Numerator = 60;
		swapChainDesc.BufferDesc.RefreshRate.Denominator = 1;
		swapChainDesc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
		swapChainDesc.OutputWindow = hWnd;
		swapChainDesc.Windowed = true;
		swapChainDesc.SampleDesc.Count = 1;
		swapChainDesc.SampleDesc.Quality = 0;

		HRESULT result;
		unsigned int driver = 0, creationFlags = 0;
		for(driver = 0; driver<totalDriverTypes; driver++)
		{
			result = D3D11CreateDeviceAndSwapChain(0, driverTypes[driver], 0,
				creationFlags, featureLevels, totalFeaturesLevels, 
				D3D11_SDK_VERSION, &swapChainDesc, &swapChain,
				&d3dDevice, &featureLevel, &d3dContext);

			if(SUCCEEDED(result))
			{
				driverType = driverTypes[driver];
				break;
			}
		}

		if(FAILED(result))
		{
			//Error al crear el Direct3D device
			return false;
		}
		
		ID3D11Texture2D* backBufferTexture;
		result = swapChain->GetBuffer(0, __uuidof(ID3D11Texture2D), (LPVOID*)&backBufferTexture);
		if(FAILED(result))
		{
			//"Error al crear el swapChainBuffer
			return false;
		}

		result = d3dDevice->CreateRenderTargetView(backBufferTexture, 0, &backBufferTarget);
		if(backBufferTexture)
			backBufferTexture->Release();

		if(FAILED(result))
		{
			//Error al crear el renderTargetView
			return false;
		}


		D3D11_VIEWPORT viewport;
		viewport.Width = (FLOAT)width;
		viewport.Height = (FLOAT)heigth;
		viewport.MinDepth = 0.0f;
		viewport.MaxDepth = 1.0f;
		viewport.TopLeftX = 0.0f;
		viewport.TopLeftY = 0.0f;

		d3dContext->RSSetViewports(1, &viewport);

		D3D11_TEXTURE2D_DESC depthTexDesc;
		ZeroMemory(&depthTexDesc, sizeof(depthTexDesc));
		depthTexDesc.Width = width;
		depthTexDesc.Height = heigth;
		depthTexDesc.MipLevels = 1;
		depthTexDesc.ArraySize = 1;
		depthTexDesc.Format = DXGI_FORMAT_D24_UNORM_S8_UINT;
		depthTexDesc.SampleDesc.Count = 1;
		depthTexDesc.SampleDesc.Quality = 0;
		depthTexDesc.Usage = D3D11_USAGE_DEFAULT;
		depthTexDesc.BindFlags = D3D11_BIND_DEPTH_STENCIL;
		depthTexDesc.CPUAccessFlags = 0;
		depthTexDesc.MiscFlags = 0;
		
		result = d3dDevice->CreateTexture2D(&depthTexDesc, NULL, &depthTexture);
		if(FAILED(result))
		{
			MessageBox(0, L"Error", L"Error al crear la DepthTexture", MB_OK);
			return false;
		}

		D3D11_DEPTH_STENCIL_VIEW_DESC descDSV;
		ZeroMemory(&descDSV, sizeof(descDSV));
		descDSV.Format = depthTexDesc.Format;
		descDSV.ViewDimension = D3D11_DSV_DIMENSION_TEXTURE2D;
		descDSV.Texture2D.MipSlice = 0;

		result = d3dDevice->CreateDepthStencilView(depthTexture, &descDSV, &depthStencilView);
		if(FAILED(result))
		{
			MessageBox(0, L"Error", L"Error al crear el depth stencil target view", MB_OK);
			return false;
		}

		d3dContext->OMSetRenderTargets(1, &backBufferTarget, depthStencilView);

		return true;			
		
	}

	void LiberaD3D(void)
	{
		if(depthTexture)
			depthTexture->Release();
		if(depthStencilView)
			depthStencilView->Release();
		if(backBufferTarget)
			backBufferTarget->Release();
		if(swapChain)
			swapChain->Release();
		if(d3dContext)
			d3dContext->Release();
		if(d3dDevice)
			d3dDevice->Release();

		depthTexture = 0;
		depthStencilView = 0;
		d3dDevice = 0;
		d3dContext = 0;
		swapChain = 0;
		backBufferTarget = 0;
	}
	
	void Render(void)
	{
		float sphere[3] = { 0,0,0 };
		float prevPos[3] = { camara->posCam.x, camara->posCam.z, camara->posCam.z };
		static float angle = 0.0f;
		angle += 0.005;
		if (angle >= 360) angle = 0.0f;
		bool collide = false;
		if( d3dContext == 0 )
			return;

		float clearColor[4] = { 0, 0, 0, 1.0f };
		d3dContext->ClearRenderTargetView( backBufferTarget, clearColor );
		d3dContext->ClearDepthStencilView( depthStencilView, D3D11_CLEAR_DEPTH, 1.0f, 0 );
		camara->posCam.y = terreno->Superficie(camara->posCam.x, camara->posCam.z) + 7;
		camara->UpdateCam(vel, arriaba, izqder);
		skydome->Update(camara->vista, camara->proyeccion);

		float camPosXZ[2] = { camara->posCam.x, camara->posCam.z };

		float timeOfDay = sin(hour * 3.1416 / dayLength);
		
		D3DXVECTOR3 lightDir = D3DXVECTOR3(-timeOfDay*750, 750*(1-abs(timeOfDay)), timeOfDay*750);
		D3DXVECTOR3 ambientColor = D3DXVECTOR3(1,1,1);
		D3DXVECTOR3 diffuseColor = D3DXVECTOR3(1,1,1);
		float FAA = 0.3;
		float FAD = 1 - abs(timeOfDay);

		TurnOffDepth();
		skydome->Render(camara->posCam, timeOfDay);
		TurnOnDepth();
		terreno->Draw(camara->vista, camara->proyeccion, camara->posCam, lightDir, ambientColor, diffuseColor, FAA, FAD);
		//TurnOnAlphaBlending();
		billboard->Draw(camara->vista, camara->proyeccion, camara->posCam, -88, 575, 215, 35, uv1, uv2, uv3, uv4, frameBillboard);
		billboard->Draw(camara->vista, camara->proyeccion, camara->posCam, 67, 575, 215, 35, uv1, uv2, uv3, uv4, frameBillboard);

		vector2 v1[32];
		vector2 v2[32];
		vector2 v3[32];
		vector2 v4[32];

		float desertMiceYPosition = 0;
		if (timeOfDay > 0.5)
			desertMiceYPosition = -timeOfDay * 2;
		else
			desertMiceYPosition = 0;

		for (int i = 0; i < 32; i++)
		{
			v1[i].u = 0;
			v1[i].v = 1;

			v2[i].u = 0;
			v2[i].v = 0;
			
			v3[i].u = 1;
			v3[i].v = 0;
			
			v4[i].u = 1;
			v4[i].v = 1;
		}
		for (int i = 0; i < 100; i++)
		{
			desertMice->Draw(camara->vista, camara->proyeccion, camara->posCam, micePositions[i].x, micePositions[i].y, terreno->Superficie(micePositions[i].x, micePositions[i].y)+desertMiceYPosition, 1, v1, v2, v3, v4, 0);
		}

		//TurnOffAlphaBlending();
		Worm->Draw(camara->vista, camara->proyeccion, terreno->Superficie(-400, 0)-25, camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		Fangs->Draw(camara->vista, camara->proyeccion, terreno->Superficie(-400, 0)-25, camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		
		TheKeep->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0)-10, camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepRamp->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepDoorL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepDoorR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepColumnL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepColumnR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepTorchL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		TheKeepTorchR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0), camara->posCam, 10.0f, 0, 'A', 1, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		
		SietchTabrBase->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontLBigColumnL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontLBigColumnR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontLSmallColumnL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontLSmallColumnR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontRBigColumnL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontRBigColumnR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontRSmallColumnL->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFrontRSmallColumnR->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, -450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrFloor->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0,-450)+0.05f, camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		SietchTabrBalcony->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0,-450), camara->posCam, 10.0f, 0, 'A', 2.5f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		
		for(int i = 0; i<36; i++)
		{
			if(i<24)
				rock[i]->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0)-15, camara->posCam, 10.0f, 0, 'A', 0.2f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
			else if(i<29 || i>30)
				rock[i]->Draw(camara->vista, camara->proyeccion, terreno->Superficie(0, 0)-40, camara->posCam, 10.0f, -90, 'A', 0.2f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		}


		Crate->Draw(camara->vista, camara->proyeccion, terreno->Superficie(-200,0)-0.5f, camara->posCam, 10.0f, 0, 'A', 3, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
		
		TurnOnAlphaBlending();
			HologramCrate->Draw(camara->vista, camara->proyeccion, terreno->Superficie(-200,0)-0.6f, camara->posCam, 10.0f, 0, 'A', 3.6f, timeOfDay, lightDir, ambientColor, diffuseColor, FAA, FAD);
			Water->Draw(camara->vista, camara->proyeccion, terreno->Superficie(-480, 0)+7, camara->posCam, 10.0f, 0, 'A', 60, timeOfDay, lightDir, ambientColor, diffuseColor, FAA/2, FAD/*/2*/);
		TurnOffAlphaBlending();

		swapChain->Present( 1, 0 );
		hour++;
		if (hour > dayLength)
			hour = 0;
	}

	bool isPointInsideSphere(float* point, float* sphere) {
		bool collition = false;

		float distance = sqrt((point[0] - sphere[0]) * (point[0] - sphere[0]) +
			(point[1] - sphere[1]) * (point[1] - sphere[1]));

		if (distance < sphere[2])
			collition = true;
		return collition;
	}

	//Activa el alpha blend para dibujar con transparencias
	void TurnOnAlphaBlending()
	{
		float blendFactor[4];
		blendFactor[0] = 0.0f;
		blendFactor[1] = 0.0f;
		blendFactor[2] = 0.0f;
		blendFactor[3] = 0.0f;
		HRESULT result;

		D3D11_BLEND_DESC descABSD;
		ZeroMemory(&descABSD, sizeof(D3D11_BLEND_DESC));
		descABSD.RenderTarget[0].BlendEnable = TRUE;
		descABSD.RenderTarget[0].SrcBlend = D3D11_BLEND_ONE;
		descABSD.RenderTarget[0].DestBlend = D3D11_BLEND_INV_SRC_ALPHA;
		descABSD.RenderTarget[0].BlendOp = D3D11_BLEND_OP_ADD;
		descABSD.RenderTarget[0].SrcBlendAlpha = D3D11_BLEND_ONE;
		descABSD.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ZERO;
		descABSD.RenderTarget[0].BlendOpAlpha = D3D11_BLEND_OP_ADD;
		descABSD.RenderTarget[0].RenderTargetWriteMask = 0x0f;

		result = d3dDevice->CreateBlendState(&descABSD, &alphaBlendState);
		if(FAILED(result))
		{
			MessageBox(0, L"Error", L"Error al crear el blend state", MB_OK);
			return;
		}

		d3dContext->OMSetBlendState(alphaBlendState, blendFactor, 0xffffffff);
	}

	//Regresa al blend normal(solido)
	void TurnOffAlphaBlending()
	{
		D3D11_BLEND_DESC descCBSD;
		ZeroMemory(&descCBSD, sizeof(D3D11_BLEND_DESC));
		descCBSD.RenderTarget[0].BlendEnable = FALSE;
		descCBSD.RenderTarget[0].SrcBlend = D3D11_BLEND_ONE;
		descCBSD.RenderTarget[0].DestBlend = D3D11_BLEND_INV_SRC_ALPHA;
		descCBSD.RenderTarget[0].BlendOp = D3D11_BLEND_OP_ADD;
		descCBSD.RenderTarget[0].SrcBlendAlpha = D3D11_BLEND_ONE;
		descCBSD.RenderTarget[0].DestBlendAlpha = D3D11_BLEND_ZERO;
		descCBSD.RenderTarget[0].BlendOpAlpha = D3D11_BLEND_OP_ADD;
		descCBSD.RenderTarget[0].RenderTargetWriteMask = 0x0f;
		HRESULT result;

		result = d3dDevice->CreateBlendState(&descCBSD, &commonBlendState);
		if(FAILED(result))
		{
			MessageBox(0, L"Error", L"Error al crear el blend state", MB_OK);
			return;
		}

		d3dContext->OMSetBlendState(commonBlendState, NULL, 0xffffffff);
	}

	void TurnOnDepth()
	{
		D3D11_DEPTH_STENCIL_DESC descDSD;
		ZeroMemory(&descDSD, sizeof(descDSD));
		descDSD.DepthEnable = true;
		descDSD.DepthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL;
		descDSD.DepthFunc = D3D11_COMPARISON_LESS;
		descDSD.StencilEnable=true;
		descDSD.StencilReadMask = 0xFF;
		descDSD.StencilWriteMask = 0xFF;
		descDSD.FrontFace.StencilFailOp = D3D11_STENCIL_OP_KEEP;
		descDSD.FrontFace.StencilDepthFailOp = D3D11_STENCIL_OP_INCR;
		descDSD.FrontFace.StencilPassOp = D3D11_STENCIL_OP_KEEP;
		descDSD.FrontFace.StencilFunc = D3D11_COMPARISON_ALWAYS;
		descDSD.BackFace.StencilFailOp = D3D11_STENCIL_OP_KEEP;
		descDSD.BackFace.StencilDepthFailOp = D3D11_STENCIL_OP_DECR;
		descDSD.BackFace.StencilPassOp = D3D11_STENCIL_OP_KEEP;
		descDSD.BackFace.StencilFunc = D3D11_COMPARISON_ALWAYS;

		d3dDevice->CreateDepthStencilState(&descDSD, &depthStencilState);
		
		d3dContext->OMSetDepthStencilState(depthStencilState, 1);
	}

	void TurnOffDepth()
	{
		D3D11_DEPTH_STENCIL_DESC descDDSD;
		ZeroMemory(&descDDSD, sizeof(descDDSD));
		descDDSD.DepthEnable = false;
		descDDSD.DepthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL;
		descDDSD.DepthFunc = D3D11_COMPARISON_LESS;
		descDDSD.StencilEnable=true;
		descDDSD.StencilReadMask = 0xFF;
		descDDSD.StencilWriteMask = 0xFF;
		descDDSD.FrontFace.StencilFailOp = D3D11_STENCIL_OP_KEEP;
		descDDSD.FrontFace.StencilDepthFailOp = D3D11_STENCIL_OP_INCR;
		descDDSD.FrontFace.StencilPassOp = D3D11_STENCIL_OP_KEEP;
		descDDSD.FrontFace.StencilFunc = D3D11_COMPARISON_ALWAYS;
		descDDSD.BackFace.StencilFailOp = D3D11_STENCIL_OP_KEEP;
		descDDSD.BackFace.StencilDepthFailOp = D3D11_STENCIL_OP_DECR;
		descDDSD.BackFace.StencilPassOp = D3D11_STENCIL_OP_KEEP;
		descDDSD.BackFace.StencilFunc = D3D11_COMPARISON_ALWAYS;

		d3dDevice->CreateDepthStencilState(&descDDSD, &depthStencilDisabledState);
		d3dContext->OMSetDepthStencilState(depthStencilDisabledState, 1);
	}

	void billCargaFuego()
	{
		/*float width = .1;
		float height = .165;*/

		uv1[0].u = .125;
		uv2[0].u = .125;
		uv3[0].u = 0;
		uv4[0].u = 0;

		uv1[0].v = .25;
		uv2[0].v = 0;
		uv3[0].v = 0;
		uv4[0].v = .25;


		for (int j = 0; j < 8; j++) {
			uv1[j].u = uv1[0].u + (j * .125);
			uv2[j].u = uv2[0].u + (j * .125);
			uv3[j].u = uv3[0].u + (j * .125);
			uv4[j].u = uv4[0].u + (j * .125);

			uv1[j].v = .25;
			uv2[j].v = 0;
			uv3[j].v = 0;
			uv4[j].v = .25;
		}
		for (int j = 0; j < 8; j++) {
			uv1[j + 8].u = uv1[0].u + (j * .125);
			uv2[j + 8].u = uv2[0].u + (j * .125);
			uv3[j + 8].u = uv3[0].u + (j * .125);
			uv4[j + 8].u = uv4[0].u + (j * .125);

			uv1[j + 8].v = .5;
			uv2[j + 8].v = .25;
			uv3[j + 8].v = .25;
			uv4[j + 8].v = .5;
		}

		for (int j = 0; j < 8; j++) {
			uv1[j + 16].u = uv1[0].u + (j * .125);
			uv2[j + 16].u = uv2[0].u + (j * .125);
			uv3[j + 16].u = uv3[0].u + (j * .125);
			uv4[j + 16].u = uv4[0].u + (j * .125);

			uv1[j + 16].v = .75;
			uv2[j + 16].v = .5;
			uv3[j + 16].v = .5;
			uv4[j + 16].v = .75;
		}

		for (int j = 0; j < 8; j++) {
			uv1[j + 24].u = uv1[0].u + (j * .125);
			uv2[j + 24].u = uv2[0].u + (j * .125);
			uv3[j + 24].u = uv3[0].u + (j * .125);
			uv4[j + 24].u = uv4[0].u + (j * .125);

			uv1[j + 24].v = 1;
			uv2[j + 24].v = .75;
			uv3[j + 24].v = .75;
			uv4[j + 24].v = 1;
		}
	}

	bool canMove(float x, float z)
	{
		if (x < 450 && x > -450 && z < 450 && z > -450)
			return true;
		else if (sqrt(pow(x + 380, 2) + pow(z + 30, 2)) < 15)
			return false;
		else
			return false;
	}
};
#endif
{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"SampleScene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"reflectionDecodingFormat":1,
			"reflection":"Assets/Scenes/SampleSceneGIReflection.ltcb.ls",
			"reflectionIntensity":1,
			"ambientMode":1,
			"ambientSphericalHarmonics":[
				0.1678835,
				-0.01659199,
				-0.008447804,
				0.01006564,
				0.007637935,
				-0.006409349,
				0.007758324,
				-0.01170866,
				0.02531249,
				0.2107364,
				0.0270152,
				-0.01401796,
				0.01670585,
				0.01289547,
				-0.01082089,
				0.0111392,
				-0.01787416,
				0.03653714,
				0.289939,
				0.1099624,
				-0.02583887,
				0.0307875,
				0.02498046,
				-0.0209632,
				0.01355317,
				-0.02699236,
				0.04539129
			],
			"ambientSphericalHarmonicsIntensity":1,
			"lightmaps":[],
			"enableFog":true,
			"fogStart":14,
			"fogRange":6,
			"fogColor":[
				1,
				0.6435197,
				0.3176471
			]
		},
		"child":[
			{
				"type":"DirectionLight",
				"instanceID":0,
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1786062,
						0.8213938,
						0.3830222,
						-0.3830222
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":0,
					"color":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":1,
				"props":{
					"name":"Floor",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						-5,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						9,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/Floor.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":2,
				"props":{
					"name":"Player",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.5,
						0.5,
						0.5
					]
				},
				"components":[
					{
						"type":"Rigidbody3D",
						"mass":1,
						"isKinematic":false,
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"linearDamping":0,
						"angularDamping":0.05,
						"overrideGravity":false,
						"gravity":[
							0,
							0,
							0
						],
						"shapes":[
							{
								"type":"CapsuleColliderShape",
								"center":[
									0,
									0,
									0
								],
								"radius":0.5,
								"height":2,
								"orientation":1
							}
						],
						"isTrigger":false,
						"linearFactor":[
							1,
							1,
							1
						],
						"angularFactor":[
							0,
							0,
							0
						]
					}
				],
				"child":[
					{
						"type":"Sprite3D",
						"instanceID":3,
						"props":{
							"name":"Capsule",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								-1,
								0
							],
							"rotation":[
								0,
								0,
								0,
								-1
							],
							"scale":[
								1,
								1,
								1
							]
						},
						"components":[
							{
								"type":"Animator",
								"layers":[
									{
										"name":"Base Layer",
										"weight":0,
										"blendingMode":0,
										"states":[
											{
												"name":"Idle",
												"clipPath":"Assets/Anim/Idle-Idle.lani"
											},
											{
												"name":"XuLi",
												"clipPath":"Assets/Anim/XuLi-XuLi.lani"
											},
											{
												"name":"Jump",
												"clipPath":"Assets/Anim/Jump-Jump.lani"
											}
										]
									}
								],
								"cullingMode":0,
								"playOnWake":true
							}
						],
						"child":[
							{
								"type":"MeshSprite3D",
								"instanceID":4,
								"props":{
									"name":"Capsule (1)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										1,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Library/unity default resources-Capsule.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Player.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							}
						]
					},
					{
						"type":"TrailSprite3D",
						"instanceID":5,
						"props":{
							"name":"Trail",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								0,
								0
							],
							"rotation":[
								0,
								0,
								0,
								-1
							],
							"scale":[
								1,
								1,
								1
							],
							"time":0.25,
							"minVertexDistance":0.1,
							"widthMultiplier":0.2,
							"textureMode":0,
							"widthCurve":[
								{
									"time":0,
									"inTangent":0,
									"outTangent":0,
									"value":1
								},
								{
									"time":0.9937744,
									"inTangent":0,
									"outTangent":0,
									"value":0.2227325
								},
								{
									"time":1,
									"inTangent":0,
									"outTangent":0,
									"value":0.2227325
								}
							],
							"colorGradient":{
								"mode":0,
								"colorKeys":[
									{
										"time":0,
										"value":[
											1,
											1,
											1
										]
									},
									{
										"time":1,
										"value":[
											1,
											1,
											1
										]
									}
								],
								"alphaKeys":[
									{
										"time":0,
										"value":1
									},
									{
										"time":1,
										"value":0.145098
									}
								]
							},
							"alignment":0,
							"materials":[
								{
									"type":"Laya.TrailMaterial",
									"path":"Assets/Trail.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"ShuriKenParticle3D",
						"instanceID":6,
						"props":{
							"name":"XuLi",
							"active":false,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								-0.4000001,
								0
							],
							"rotation":[
								0,
								0,
								0,
								-1
							],
							"scale":[
								1.25,
								1.25,
								1.25
							],
							"main":{
								"randomSeed":3.218506E+09,
								"bases":{
									"isPerformanceMode":true,
									"prewarm":false,
									"startLifetimeType":2,
									"startLifetimeConstant":0.8,
									"startLifetimeConstantMin":0.5,
									"startLifetimeConstantMax":0.8,
									"startSpeedType":2,
									"startSpeedConstant":-1.5,
									"startSpeedConstantMin":-1,
									"startSpeedConstantMax":-1.5,
									"startSizeType":2,
									"startSizeConstant":0.14,
									"startSizeConstantMin":0.07,
									"startSizeConstantMax":0.14,
									"startRotationType":2,
									"startRotationConstant":6.283185,
									"startRotationConstantMax":6.283185,
									"maxParticles":5
								},
								"vector3s":{
									"startSizeConstantSeparate":[
										0.14,
										1,
										1
									],
									"startSizeConstantMinSeparate":[
										0.07,
										0,
										0
									],
									"startSizeConstantMaxSeparate":[
										0.14,
										1,
										1
									],
									"startRotationConstantSeparate":[
										0,
										0,
										-6.283185
									],
									"startRotationConstantMaxSeparate":[
										0,
										0,
										-6.283185
									]
								}
							},
							"emission":{
								"bases":{
									"enable":true,
									"emissionRate":4
								}
							},
							"shape":{
								"shapeType":0,
								"bases":{
									"enable":true,
									"radius":0.6,
									"emitFromShell":true
								}
							},
							"colorOverLifetime":{
								"bases":{
									"enable":true
								},
								"color":{
									"type":1,
									"gradient":{
										"alphas":[
											{
												"key":0,
												"value":0
											},
											{
												"key":0.2,
												"value":1
											},
											{
												"key":0.3558862,
												"value":0.5882353
											},
											{
												"key":0.5029374,
												"value":1
											},
											{
												"key":0.6411841,
												"value":0.5882353
											},
											{
												"key":0.8,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientMax":{
										"alphas":[
											{
												"key":0,
												"value":0
											},
											{
												"key":0.2,
												"value":1
											},
											{
												"key":0.3558862,
												"value":0.5882353
											},
											{
												"key":0.5029374,
												"value":1
											},
											{
												"key":0.6411841,
												"value":0.5882353
											},
											{
												"key":0.8,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									}
								}
							},
							"sizeOverLifetime":{
								"bases":{
									"enable":true
								},
								"size":{
									"type":0,
									"gradient":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":0.1455696,
												"value":0.6011904
											},
											{
												"key":0.3598615,
												"value":0.8400946
											},
											{
												"key":0.4949829,
												"value":0.5332029
											},
											{
												"key":0.7430455,
												"value":0.7514254
											},
											{
												"key":1,
												"value":0.3452381
											}
										]
									},
									"gradientX":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":0.1455696,
												"value":0.6011904
											},
											{
												"key":0.3598615,
												"value":0.8400946
											},
											{
												"key":0.4949829,
												"value":0.5332029
											},
											{
												"key":0.7430455,
												"value":0.7514254
											},
											{
												"key":1,
												"value":0.3452381
											}
										]
									},
									"gradientY":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientZ":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":0.1455696,
												"value":0.6011904
											},
											{
												"key":0.3598615,
												"value":0.8400946
											},
											{
												"key":0.4949829,
												"value":0.5332029
											},
											{
												"key":0.7430455,
												"value":0.7514254
											},
											{
												"key":1,
												"value":0.3452381
											}
										]
									},
									"gradientXMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":0.1455696,
												"value":0.6011904
											},
											{
												"key":0.3598615,
												"value":0.8400946
											},
											{
												"key":0.4949829,
												"value":0.5332029
											},
											{
												"key":0.7430455,
												"value":0.7514254
											},
											{
												"key":1,
												"value":0.3452381
											}
										]
									},
									"gradientYMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientZMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									}
								}
							},
							"renderer":{
								"bases":{
									"sortingFudge":-1
								},
								"resources":{
									"material":"Assets/Texture/Materials/bai.lmat"
								}
							}
						},
						"components":[],
						"child":[
							{
								"type":"ShuriKenParticle3D",
								"instanceID":7,
								"props":{
									"name":"XuLi (1)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										1,
										1,
										1
									],
									"main":{
										"randomSeed":2.016833E+09,
										"bases":{
											"isPerformanceMode":true,
											"prewarm":false,
											"startLifetimeType":2,
											"startLifetimeConstant":0.8,
											"startLifetimeConstantMin":0.5,
											"startLifetimeConstantMax":0.8,
											"startSpeedType":2,
											"startSpeedConstant":-1.5,
											"startSpeedConstantMin":-1,
											"startSpeedConstantMax":-1.5,
											"startSizeType":2,
											"startSizeConstant":0.14,
											"startSizeConstantMin":0.07,
											"startSizeConstantMax":0.14,
											"startRotationType":2,
											"startRotationConstant":6.283185,
											"startRotationConstantMax":6.283185,
											"maxParticles":5
										},
										"vector3s":{
											"startSizeConstantSeparate":[
												0.14,
												1,
												1
											],
											"startSizeConstantMinSeparate":[
												0.07,
												0,
												0
											],
											"startSizeConstantMaxSeparate":[
												0.14,
												1,
												1
											],
											"startRotationConstantSeparate":[
												0,
												0,
												-6.283185
											],
											"startRotationConstantMaxSeparate":[
												0,
												0,
												-6.283185
											]
										}
									},
									"emission":{
										"bases":{
											"enable":true,
											"emissionRate":4
										}
									},
									"shape":{
										"shapeType":0,
										"bases":{
											"enable":true,
											"radius":0.6,
											"emitFromShell":true
										}
									},
									"colorOverLifetime":{
										"bases":{
											"enable":true
										},
										"color":{
											"type":1,
											"gradient":{
												"alphas":[
													{
														"key":0,
														"value":0
													},
													{
														"key":0.2,
														"value":1
													},
													{
														"key":0.3558862,
														"value":0.5882353
													},
													{
														"key":0.5029374,
														"value":1
													},
													{
														"key":0.6411841,
														"value":0.5882353
													},
													{
														"key":0.8,
														"value":1
													},
													{
														"key":1,
														"value":0
													}
												]
											},
											"gradientMax":{
												"alphas":[
													{
														"key":0,
														"value":0
													},
													{
														"key":0.2,
														"value":1
													},
													{
														"key":0.3558862,
														"value":0.5882353
													},
													{
														"key":0.5029374,
														"value":1
													},
													{
														"key":0.6411841,
														"value":0.5882353
													},
													{
														"key":0.8,
														"value":1
													},
													{
														"key":1,
														"value":0
													}
												]
											}
										}
									},
									"sizeOverLifetime":{
										"bases":{
											"enable":true
										},
										"size":{
											"type":0,
											"gradient":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":0.1455696,
														"value":0.6011904
													},
													{
														"key":0.3598615,
														"value":0.8400946
													},
													{
														"key":0.4949829,
														"value":0.5332029
													},
													{
														"key":0.7430455,
														"value":0.7514254
													},
													{
														"key":1,
														"value":0.3452381
													}
												]
											},
											"gradientX":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":0.1455696,
														"value":0.6011904
													},
													{
														"key":0.3598615,
														"value":0.8400946
													},
													{
														"key":0.4949829,
														"value":0.5332029
													},
													{
														"key":0.7430455,
														"value":0.7514254
													},
													{
														"key":1,
														"value":0.3452381
													}
												]
											},
											"gradientY":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":1,
														"value":1
													}
												]
											},
											"gradientZ":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":1,
														"value":1
													}
												]
											},
											"gradientMax":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":0.1455696,
														"value":0.6011904
													},
													{
														"key":0.3598615,
														"value":0.8400946
													},
													{
														"key":0.4949829,
														"value":0.5332029
													},
													{
														"key":0.7430455,
														"value":0.7514254
													},
													{
														"key":1,
														"value":0.3452381
													}
												]
											},
											"gradientXMax":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":0.1455696,
														"value":0.6011904
													},
													{
														"key":0.3598615,
														"value":0.8400946
													},
													{
														"key":0.4949829,
														"value":0.5332029
													},
													{
														"key":0.7430455,
														"value":0.7514254
													},
													{
														"key":1,
														"value":0.3452381
													}
												]
											},
											"gradientYMax":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":1,
														"value":1
													}
												]
											},
											"gradientZMax":{
												"sizes":[
													{
														"key":0,
														"value":1
													},
													{
														"key":1,
														"value":1
													}
												]
											}
										}
									},
									"renderer":{
										"bases":{
											"sortingFudge":-1
										},
										"resources":{
											"material":"Assets/Texture/Materials/Glow295.lmat"
										}
									}
								},
								"components":[],
								"child":[]
							}
						]
					},
					{
						"type":"ShuriKenParticle3D",
						"instanceID":8,
						"props":{
							"name":"playerFall",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								-1.05,
								0
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"main":{
								"randomSeed":2.98193E+09,
								"bases":{
									"isPerformanceMode":true,
									"duration":0.3,
									"looping":false,
									"startLifetimeConstant":0.3,
									"startLifetimeConstantMax":0.3,
									"startSpeedType":2,
									"startSpeedConstant":2,
									"startSpeedConstantMin":1,
									"startSpeedConstantMax":2,
									"startSizeType":2,
									"startSizeConstant":0.1,
									"startSizeConstantMin":0.05,
									"startSizeConstantMax":0.1,
									"simulationSpace":0,
									"playOnAwake":false,
									"maxParticles":1000
								},
								"vector3s":{
									"startSizeConstantSeparate":[
										0.1,
										1,
										1
									],
									"startSizeConstantMinSeparate":[
										0.05,
										0,
										0
									],
									"startSizeConstantMaxSeparate":[
										0.1,
										1,
										1
									]
								}
							},
							"emission":{
								"bases":{
									"enable":true,
									"emissionRate":50
								}
							},
							"shape":{
								"shapeType":2,
								"bases":{
									"enable":true,
									"radius":0.1851988,
									"angle":0.6357734,
									"length":0.2,
									"emitType":2
								}
							},
							"renderer":{
								"resources":{
									"material":"Assets/Texture/Materials/bai.lmat"
								}
							}
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"Sprite3D",
				"instanceID":9,
				"props":{
					"name":"Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[
					{
						"type":"Camera",
						"instanceID":10,
						"props":{
							"name":"Main Camera",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								6.2,
								10,
								-6.2
							],
							"rotation":[
								-0.1464466,
								0.8535535,
								0.3535534,
								0.3535534
							],
							"scale":[
								1,
								1,
								1
							],
							"clearFlag":1,
							"orthographic":false,
							"orthographicVerticalSize":10,
							"fieldOfView":60,
							"enableHDR":false,
							"nearPlane":0.3,
							"farPlane":1000,
							"viewport":[
								0,
								0,
								1,
								1
							],
							"clearColor":[
								0.1921569,
								0.3019608,
								0.4745098,
								0
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":11,
						"props":{
							"name":"SkyPlane",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-3.9,
								0.4,
								3.9
							],
							"rotation":[
								0.5624222,
								0.3036032,
								0.2329629,
								-0.732963
							],
							"scale":[
								6.610001,
								1,
								6.240002
							],
							"meshPath":"Library/unity default resources-Plane.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Sky.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"MeshColliderShape",
										"mesh":"Library/unity default resources-Plane.lm"
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"ShuriKenParticle3D",
						"instanceID":12,
						"props":{
							"name":"StarEffect",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								6.13,
								0
							],
							"rotation":[
								0.5624222,
								0.3036032,
								0.2329629,
								-0.732963
							],
							"scale":[
								1,
								1,
								1
							],
							"main":{
								"randomSeed":2.092574E+09,
								"bases":{
									"isPerformanceMode":true,
									"startLifetimeType":2,
									"startLifetimeConstant":2.5,
									"startLifetimeConstantMin":1.8,
									"startLifetimeConstantMax":2.5,
									"startSpeedConstant":0,
									"startSpeedConstantMax":0,
									"startSizeType":2,
									"startSizeConstant":0.4,
									"startSizeConstantMin":0.2,
									"startSizeConstantMax":0.4,
									"startRotationType":2,
									"startRotationConstant":6.283185,
									"startRotationConstantMax":6.283185,
									"scaleMode":0,
									"maxParticles":8
								},
								"vector3s":{
									"startSizeConstantSeparate":[
										0.4,
										1,
										1
									],
									"startSizeConstantMinSeparate":[
										0.2,
										0,
										0
									],
									"startSizeConstantMaxSeparate":[
										0.4,
										1,
										1
									],
									"startRotationConstantSeparate":[
										0,
										0,
										-6.283185
									],
									"startRotationConstantMaxSeparate":[
										0,
										0,
										-6.283185
									]
								}
							},
							"emission":{
								"bases":{
									"enable":true
								}
							},
							"shape":{
								"shapeType":3,
								"bases":{
									"enable":true,
									"radius":2.5,
									"angle":1.570796,
									"x":5.72699,
									"z":2.584733
								}
							},
							"colorOverLifetime":{
								"bases":{
									"enable":true
								},
								"color":{
									"type":1,
									"gradient":{
										"alphas":[
											{
												"key":0,
												"value":0
											},
											{
												"key":0.2382391,
												"value":1
											},
											{
												"key":0.8,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientMax":{
										"alphas":[
											{
												"key":0,
												"value":0
											},
											{
												"key":0.2382391,
												"value":1
											},
											{
												"key":0.8,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									}
								}
							},
							"sizeOverLifetime":{
								"bases":{
									"enable":true
								},
								"size":{
									"type":0,
									"gradient":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientX":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientY":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientZ":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientXMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":0
											}
										]
									},
									"gradientYMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									},
									"gradientZMax":{
										"sizes":[
											{
												"key":0,
												"value":1
											},
											{
												"key":1,
												"value":1
											}
										]
									}
								}
							},
							"rotationOverLifetime":{
								"bases":{
									"enable":true
								},
								"angularVelocity":{
									"type":2,
									"constant":-0.5235988,
									"constantMin":0.5235988,
									"constantMax":-0.5235988,
									"constantSeparate":[
										0,
										0,
										0.5235988
									],
									"constantMinSeparate":[
										0,
										0,
										0.5235988
									],
									"constantMaxSeparate":[
										0,
										0,
										-0.5235988
									]
								}
							},
							"renderer":{
								"bases":{
									"sortingFudge":-1
								},
								"resources":{
									"material":"Assets/Texture/Materials/KaTong072.lmat"
								}
							}
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"ShuriKenParticle3D",
				"instanceID":13,
				"props":{
					"name":"GuangQuan",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						-0.48,
						0
					],
					"rotation":[
						0.7071068,
						0,
						0,
						-0.7071068
					],
					"scale":[
						1,
						1,
						1
					],
					"main":{
						"randomSeed":1.95382E+09,
						"bases":{
							"isPerformanceMode":true,
							"looping":false,
							"startLifetimeConstant":0.5,
							"startLifetimeConstantMax":0.5,
							"startSpeedConstant":0,
							"startSpeedConstantMax":0,
							"startSizeConstant":2.5,
							"startSizeConstantMax":2.5,
							"playOnAwake":false,
							"maxParticles":2
						},
						"vector3s":{
							"startSizeConstantSeparate":[
								2.5,
								1,
								1
							],
							"startSizeConstantMaxSeparate":[
								2.5,
								1,
								1
							]
						}
					},
					"emission":{
						"bases":{
							"enable":true,
							"emissionRate":0
						},
						"bursts":[
							{
								"time":0,
								"min":0,
								"max":1
							},
							{
								"time":0.1,
								"min":0,
								"max":1
							}
						]
					},
					"colorOverLifetime":{
						"bases":{
							"enable":true
						},
						"color":{
							"type":1,
							"gradient":{
								"alphas":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.1441215,
										"value":0.9019608
									},
									{
										"key":0.3176471,
										"value":0.6627451
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"gradientMax":{
								"alphas":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.1441215,
										"value":0.9019608
									},
									{
										"key":0.3176471,
										"value":0.6627451
									},
									{
										"key":1,
										"value":0
									}
								]
							}
						}
					},
					"sizeOverLifetime":{
						"bases":{
							"enable":true
						},
						"size":{
							"type":0,
							"gradient":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.4029314,
										"value":0.7559524
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientX":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.4029314,
										"value":0.7559524
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientY":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZ":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.4029314,
										"value":0.7559524
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientXMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":0.4029314,
										"value":0.7559524
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientYMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							}
						}
					},
					"renderer":{
						"bases":{
							"renderMode":4,
							"sortingFudge":-1
						},
						"resources":{
							"material":"Assets/Texture/Materials/GuangQuan068.lmat",
							"mesh":"Library/unity default resources-Quad.lm"
						}
					}
				},
				"components":[],
				"child":[]
			}
		]
	}
}
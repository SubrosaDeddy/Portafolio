using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ProyectoPI
{
    public partial class Form1 : Form
    {
        private Bitmap originalPicture, tempPicture, resultPicture;
        //private bool sobel, repujado, laplace, gauss, prewitt;
        enum Filtro
        {
            SobelX,
            SobelY,
            Repujado,
            LaplaceFirst,
            LaplaceSecond,
            Gauss,
            PrewittH,
            PrewittV
        };
        public Form1()
        {
            InitializeComponent();
            this.OriginalPic.SizeMode = PictureBoxSizeMode.StretchImage;
            //this.OriginalPic.SizeMode = PictureBoxSizeMode.CenterImage;
            this.ResultPic.SizeMode = PictureBoxSizeMode.StretchImage;
            //this.ResultPic.SizeMode = PictureBoxSizeMode.CenterImage;
        }

        private void button1_Click(object sender, EventArgs e) //Cargar
        {
            using (OpenFileDialog dlg = new OpenFileDialog())
            {
                dlg.Title = "Open Image";
                dlg.Filter = "Image Files| *.jpg; *.jpeg; *.png";

                if (dlg.ShowDialog() == DialogResult.OK)
                {
                    originalPicture = new Bitmap(dlg.FileName);
                    tempPicture = new Bitmap(originalPicture.Width, originalPicture.Height);
                    copyImage(ref tempPicture, originalPicture);
                    resultPicture = new Bitmap(originalPicture.Width, originalPicture.Height);
                    //copyImage(ref resultPicture, originalPicture);

                    this.OriginalPic.Image = originalPicture;
                    this.ResultPic.Image = resultPicture;
                    this.FilePath.Text = dlg.SafeFileName;
                    inputFileName.Text = dlg.SafeFileName;
                    refreshImage();
                }
            }
        }

        private void Sobel()
        {
            int[,] matrixX = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.SobelX, ref matrixX);

            int[,] matrixY = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.SobelY, ref matrixY);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixX, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixY, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);
        }
        private void Repujado()
        {
            int[,] matrix = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.Repujado, ref matrix);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrix, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);
        }
        private void Laplace()
        {
            int[,] matrixFirst = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.LaplaceFirst, ref matrixFirst);

            int[,] matrixSecond = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.LaplaceSecond, ref matrixSecond);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixFirst, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixSecond, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);
        }
        private void Gauss()
        {
            //1/16
            int[,] matrix = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.Gauss, ref matrix);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrix, 16);
                }
            }

            copyImage(ref tempPicture, resultPicture);
        }
        private void Prewitt()
        {
            int[,] matrixH = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.PrewittH, ref matrixH);

            int[,] matrixV = new int[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            getMatrix(Filtro.PrewittV, ref matrixV);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixH, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);

            for (int i = 1; i < tempPicture.Width - 1; i++)
            {
                for (int j = 1; j < tempPicture.Height - 1; j++)
                {
                    Filter(ref resultPicture, tempPicture, new int[] { i, j }, matrixV, 1);
                }
            }

            copyImage(ref tempPicture, resultPicture);
        }
        private void copyImage(ref Bitmap to, Bitmap from) 
        {
            for (int i = 0; i < from.Width; i++)
            {
                for (int j = 0; j < from.Height; j++)
                {
                    to.SetPixel(i, j, from.GetPixel(i, j));
                }
            }
        }
        private void Filter(ref Bitmap result, Bitmap inputImage, int[] index, int[,] filterMatrix, int div)
        {
            Color OGcolor = inputImage.GetPixel(index[0], index[1]);
            int R = OGcolor.R;
            int G = OGcolor.G;
            int B = OGcolor.B;
            
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    int[] adjustedIndex = new int[] { index[0] - 1 + i, index[1] - 1 + j };
                    Color color = inputImage.GetPixel(adjustedIndex[0], adjustedIndex[1]);
            
                    R += color.R * filterMatrix[i, j];
                    G += color.G * filterMatrix[i, j];
                    B += color.B * filterMatrix[i, j];
                }
            }

            R /= div;
            G /= div;
            B /= div;

            R = Math.Min(Math.Max(R, 0), 255);
            G = Math.Min(Math.Max(G, 0), 255);
            B = Math.Min(Math.Max(B, 0), 255);

            result.SetPixel(index[0], index[1], Color.FromArgb(R, G, B));
        }
        private void getMatrix(Filtro kind, ref int[,] outMatrix)
        {
            if (kind.Equals(Filtro.SobelX))
            {
                outMatrix = new int[,] 
                {
                    {-1,0,1 },
                    {-2,0,2 },
                    {-1,0,1 }
                };
            }
            if (kind.Equals(Filtro.SobelY))
            {
                outMatrix = new int[,]
                {
                    {1,2,1 },
                    {0,0,0 },
                    {-1,-2,-1 }
                };
            }
            if (kind.Equals(Filtro.Repujado))
            {
                outMatrix = new int[,]
                {
                    {-2,-1,0 },
                    {-1,1,1 },
                    {0,1,2}
                };
            }
            if (kind.Equals(Filtro.LaplaceFirst))
            {
                outMatrix = new int[,]
                {
                    {0,-1,0 },
                    {-1,4,-1 },
                    {0,-1,0}
                };
            }
            if (kind.Equals(Filtro.LaplaceSecond))
            {
                outMatrix = new int[,]
                {
                    {-1,-1,-1 },
                    {-1,8,-1 },
                    {-1,-1,-1}
                };
            }
            if (kind.Equals(Filtro.Gauss))
            {
                outMatrix = new int[,]
                {
                    {1,2,1 },
                    {2,4,2 },
                    {1,2,1}
                };
            }
            if (kind.Equals(Filtro.PrewittH))
            {
                outMatrix = new int[,]
                {
                    {-1,0,1 },
                    {-1,0,1 },
                    {-1,0,1}
                };
            }
            if (kind.Equals(Filtro.PrewittV))
            {
                outMatrix = new int[,]
                {
                    {1,1,1 },
                    {0,0,0 },
                    {-1,-1,-1}
                };
            }
        }

        private void btnGuardar_Click(object sender, EventArgs e)
        {
            //OpenFileDialog open = new OpenFileDialog();
            //open.Filter = "Image Files(*.jpg; *.jpeg; *.bmp;)|*.jpg; *.jpeg; *.bmp;";
            //if (open.ShowDialog() == DialogResult.OK)
            //{
            //    resultPicture.Save("MyImage.jpg");
            //}
            resultPicture.Save(@"C:\Users\Propietario\Pictures\PdeI\"+inputFileName.Text);
        }

        private void btnVideo_Click(object sender, EventArgs e)
        {
            Video vid = new Video();
            vid.ShowDialog();
        }

        private void refreshImage()
        {
            if (SobelCheck.Checked)
            {
                Sobel();
            }
            if (RepujadoCheck.Checked)
            {
                Repujado();
            }
            if (LaplaceCheck.Checked)
            {
                Laplace();
            }
            if (GaussCheck.Checked)
            {
                Gauss();
            }
            if (PrewittCheck.Checked)
            {
                Prewitt();
            }
            refreshHistogram();
        }
        private void refreshHistogram()
        {
            int[] red = new int[256];
            int[] green = new int[256];
            int[] blue = new int[256];

            for (int i = 0; i < resultPicture.Width; i++)
            {
                for (int j = 0; j < resultPicture.Height; j++)
                {
                    Color color = resultPicture.GetPixel(i, j);
                    red[color.R]++;
                    green[color.G]++;
                    blue[color.B]++;
                }
            }
            HistogramR.Values = red;
            HistogramR.Color = Color.Red;
            HistogramG.Values = green;
            HistogramG.Color = Color.Green;
            HistogramB.Values = blue;
            HistogramB.Color = Color.Blue;
        }
    }
}

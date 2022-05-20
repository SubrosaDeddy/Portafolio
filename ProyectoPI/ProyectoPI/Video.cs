using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Emgu.CV;
using Emgu.CV.Structure;
using Emgu.CV.CvEnum;

namespace ProyectoPI
{
    public partial class Video : Form
    {
        Bitmap video;
        VideoCapture grabber;
        Image<Bgr, Byte> currentFrame;
        double duracion;
        double FrameCount;
        bool videoLoad = false;
        string FilterName = "SinMiedo";

        ColorMatrix cmPicture = new ColorMatrix(new float[][]
        {
             new float[]{1,0,0,0,0},
             new float[]{0,1,0,0,0},
             new float[]{0,0,1,0,0},
             new float[]{0,0,0,1,0},
             new float[]{0,0,0,0,1}
        });

        public Video()
        {
            InitializeComponent();
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Files(*.mp4)|*.mp4";

            if (ofd.ShowDialog() == DialogResult.OK)
            {
                grabber = new VideoCapture(ofd.FileName);
                grabber.QueryFrame();

                Mat m = new Mat();
                grabber.Read(m);

                currentFrame = new Image<Bgr, byte>(m.Bitmap);
                currentFrame.Resize(videoPicBox.Width, videoPicBox.Height, Inter.Cubic);

                videoPicBox.Image = currentFrame.Bitmap;

                duracion = grabber.GetCaptureProperty(Emgu.CV.CvEnum.CapProp.FrameCount);

                FrameCount = grabber.GetCaptureProperty(Emgu.CV.CvEnum.CapProp.PosFrames);
                videoLoad = true;
                videoPicBox.BackgroundImage = null;
            }
        }

        private void btnRGB_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                cmPicture = new ColorMatrix(new float[][]
                {
                    new float[]{1,0,0,0,0},
                    new float[]{0,1,0,0,0},
                    new float[]{0,0,1,0,0},
                    new float[]{0,0,0,1,0},
                    new float[]{0,0,0,0,1}
                });
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnFilter_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                cmPicture = new ColorMatrix(new float[][]
                {
                     new float[]{.393f,.349f,.272f,0,0},
                     new float[]{.796f,.686f,.534f,0,0},
                     new float[]{.189f,.168f,.131f,0,0},
                     new float[]{0,0,0,1.0f,0},
                     new float[]{0,0,0,0,1.0f}
                });
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnInvert_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                cmPicture = new ColorMatrix(new float[][]
                {
                    new float[]{-1,0,0,0,0},
                    new float[]{0,-1,0,0,0},
                    new float[]{0,0,-1,0,0},
                    new float[]{0,0,0,1,0},
                    new float[]{1,1,1,0,1}
                });
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnSwap_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                cmPicture = new ColorMatrix(new float[][]
                {
                    new float[]{0,0,1,0,0},
                    new float[]{0,1,0,0,0},
                    new float[]{1,0,0,0,0},
                    new float[]{0,0,0,1,0},
                    new float[]{0,0,0,0,1}
                });
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnPolaroid_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                cmPicture = new ColorMatrix(new float[][]
                {
                    new float[]{1.483f,-0.062f,-0.062f,0,0},
                    new float[]{-0.122f,1.378f,-0.122f,0,0},
                    new float[]{-0.016f,-0.016f,1.483f,0,0},
                    new float[]{0,0,0,1,0},
                    new float[]{-0.03f,0.05f,-0.02f,0,1}
                });
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnPlay_Click(object sender, EventArgs e)
        {
            if (videoLoad)
            {
                DialogResult result = MessageBox.Show("El video se reproducira en bucle", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                if (result == DialogResult.OK)
                {
                    Application.Idle += new EventHandler(CargarVideo);
                }
            }
            else
            {
                MessageBox.Show("No se cargo el video", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void CargarVideo(object sender, EventArgs e)
        {
            if (FrameCount < duracion - 2)
            {
                Mat m = new Mat();
                grabber.Read(m);

                currentFrame = new Image<Bgr, byte>(m.Bitmap);
                currentFrame.Resize(videoPicBox.Width, videoPicBox.Height, Inter.Cubic);
                FrameCount = grabber.GetCaptureProperty(CapProp.PosFrames);
            }
            else
            {
                FrameCount = 0;
                grabber.SetCaptureProperty(CapProp.PosFrames, 0);
            }

            switch (FilterName)
            {
                case "SinMiedo":
                    {
                        Image img = currentFrame.Bitmap;
                        Bitmap bmpinverted = new Bitmap(img.Width + 10, img.Height + 10); //854 x 480

                        ImageAttributes Ia = new ImageAttributes();

                        Ia.SetColorMatrix(cmPicture);
                        Graphics gr = Graphics.FromImage(bmpinverted);

                        gr.DrawImage(img, new Rectangle(0, 0, img.Width, img.Height), 0, 0, img.Width, img.Height, GraphicsUnit.Pixel, Ia);
                        gr.Dispose();
                        videoPicBox.Image = bmpinverted;

                        break;
                    }
                default:
                    {
                        videoPicBox.Image = currentFrame.Bitmap;
                        break;
                    }

            }
        }
    }
}

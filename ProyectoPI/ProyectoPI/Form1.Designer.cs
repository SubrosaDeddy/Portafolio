
namespace ProyectoPI
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ResultPic = new System.Windows.Forms.PictureBox();
            this.Cargar = new System.Windows.Forms.Button();
            this.FilePath = new System.Windows.Forms.Label();
            this.SobelCheck = new System.Windows.Forms.CheckBox();
            this.RepujadoCheck = new System.Windows.Forms.CheckBox();
            this.LaplaceCheck = new System.Windows.Forms.CheckBox();
            this.GaussCheck = new System.Windows.Forms.CheckBox();
            this.PrewittCheck = new System.Windows.Forms.CheckBox();
            this.label2 = new System.Windows.Forms.Label();
            this.OriginalPic = new System.Windows.Forms.PictureBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.HistogramR = new AForge.Controls.Histogram();
            this.HistogramG = new AForge.Controls.Histogram();
            this.HistogramB = new AForge.Controls.Histogram();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.inputFileName = new System.Windows.Forms.TextBox();
            this.btnVideo = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.ResultPic)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.OriginalPic)).BeginInit();
            this.SuspendLayout();
            // 
            // ResultPic
            // 
            this.ResultPic.Location = new System.Drawing.Point(12, 32);
            this.ResultPic.Name = "ResultPic";
            this.ResultPic.Size = new System.Drawing.Size(805, 604);
            this.ResultPic.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.ResultPic.TabIndex = 0;
            this.ResultPic.TabStop = false;
            // 
            // Cargar
            // 
            this.Cargar.Location = new System.Drawing.Point(12, 625);
            this.Cargar.Name = "Cargar";
            this.Cargar.Size = new System.Drawing.Size(75, 23);
            this.Cargar.TabIndex = 1;
            this.Cargar.Text = "Cargar Archivo";
            this.Cargar.UseVisualStyleBackColor = true;
            this.Cargar.Click += new System.EventHandler(this.button1_Click);
            // 
            // FilePath
            // 
            this.FilePath.AutoSize = true;
            this.FilePath.Location = new System.Drawing.Point(93, 630);
            this.FilePath.Name = "FilePath";
            this.FilePath.Size = new System.Drawing.Size(81, 13);
            this.FilePath.TabIndex = 2;
            this.FilePath.Text = "ArchivoXD.jpeg";
            // 
            // SobelCheck
            // 
            this.SobelCheck.AutoSize = true;
            this.SobelCheck.Location = new System.Drawing.Point(73, 8);
            this.SobelCheck.Name = "SobelCheck";
            this.SobelCheck.Size = new System.Drawing.Size(53, 17);
            this.SobelCheck.TabIndex = 3;
            this.SobelCheck.Text = "Sobel";
            this.SobelCheck.UseVisualStyleBackColor = true;
            // 
            // RepujadoCheck
            // 
            this.RepujadoCheck.AutoSize = true;
            this.RepujadoCheck.Location = new System.Drawing.Point(132, 9);
            this.RepujadoCheck.Name = "RepujadoCheck";
            this.RepujadoCheck.Size = new System.Drawing.Size(72, 17);
            this.RepujadoCheck.TabIndex = 4;
            this.RepujadoCheck.Text = "Repujado";
            this.RepujadoCheck.UseVisualStyleBackColor = true;
            // 
            // LaplaceCheck
            // 
            this.LaplaceCheck.AutoSize = true;
            this.LaplaceCheck.Location = new System.Drawing.Point(210, 8);
            this.LaplaceCheck.Name = "LaplaceCheck";
            this.LaplaceCheck.Size = new System.Drawing.Size(64, 17);
            this.LaplaceCheck.TabIndex = 5;
            this.LaplaceCheck.Text = "Laplace";
            this.LaplaceCheck.UseVisualStyleBackColor = true;
            // 
            // GaussCheck
            // 
            this.GaussCheck.AutoSize = true;
            this.GaussCheck.Location = new System.Drawing.Point(280, 8);
            this.GaussCheck.Name = "GaussCheck";
            this.GaussCheck.Size = new System.Drawing.Size(56, 17);
            this.GaussCheck.TabIndex = 6;
            this.GaussCheck.Text = "Gauss";
            this.GaussCheck.UseVisualStyleBackColor = true;
            // 
            // PrewittCheck
            // 
            this.PrewittCheck.AutoSize = true;
            this.PrewittCheck.Location = new System.Drawing.Point(342, 8);
            this.PrewittCheck.Name = "PrewittCheck";
            this.PrewittCheck.Size = new System.Drawing.Size(58, 17);
            this.PrewittCheck.TabIndex = 8;
            this.PrewittCheck.Text = "Prewitt";
            this.PrewittCheck.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(823, 383);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(60, 13);
            this.label2.TabIndex = 10;
            this.label2.Text = "Histograma";
            // 
            // OriginalPic
            // 
            this.OriginalPic.Location = new System.Drawing.Point(823, 32);
            this.OriginalPic.Name = "OriginalPic";
            this.OriginalPic.Size = new System.Drawing.Size(461, 348);
            this.OriginalPic.TabIndex = 11;
            this.OriginalPic.TabStop = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(823, 16);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(42, 13);
            this.label3.TabIndex = 12;
            this.label3.Text = "Original";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(12, 9);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(55, 13);
            this.label4.TabIndex = 13;
            this.label4.Text = "Resultado";
            // 
            // HistogramR
            // 
            this.HistogramR.Location = new System.Drawing.Point(823, 399);
            this.HistogramR.Name = "HistogramR";
            this.HistogramR.Size = new System.Drawing.Size(256, 75);
            this.HistogramR.TabIndex = 14;
            this.HistogramR.Text = "histogram1";
            this.HistogramR.Values = null;
            // 
            // HistogramG
            // 
            this.HistogramG.Location = new System.Drawing.Point(823, 480);
            this.HistogramG.Name = "HistogramG";
            this.HistogramG.Size = new System.Drawing.Size(256, 75);
            this.HistogramG.TabIndex = 15;
            this.HistogramG.Text = "histogram1";
            this.HistogramG.Values = null;
            // 
            // HistogramB
            // 
            this.HistogramB.Location = new System.Drawing.Point(823, 561);
            this.HistogramB.Name = "HistogramB";
            this.HistogramB.Size = new System.Drawing.Size(256, 75);
            this.HistogramB.TabIndex = 16;
            this.HistogramB.Text = "histogram2";
            this.HistogramB.Values = null;
            // 
            // btnGuardar
            // 
            this.btnGuardar.Location = new System.Drawing.Point(398, 623);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(75, 23);
            this.btnGuardar.TabIndex = 17;
            this.btnGuardar.Text = "Guardar";
            this.btnGuardar.UseVisualStyleBackColor = true;
            this.btnGuardar.Click += new System.EventHandler(this.btnGuardar_Click);
            // 
            // inputFileName
            // 
            this.inputFileName.Location = new System.Drawing.Point(236, 625);
            this.inputFileName.Name = "inputFileName";
            this.inputFileName.Size = new System.Drawing.Size(156, 20);
            this.inputFileName.TabIndex = 18;
            // 
            // btnVideo
            // 
            this.btnVideo.Location = new System.Drawing.Point(1208, 624);
            this.btnVideo.Name = "btnVideo";
            this.btnVideo.Size = new System.Drawing.Size(75, 23);
            this.btnVideo.TabIndex = 19;
            this.btnVideo.Text = "Video";
            this.btnVideo.UseVisualStyleBackColor = true;
            this.btnVideo.Click += new System.EventHandler(this.btnVideo_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1296, 658);
            this.Controls.Add(this.btnVideo);
            this.Controls.Add(this.inputFileName);
            this.Controls.Add(this.btnGuardar);
            this.Controls.Add(this.HistogramB);
            this.Controls.Add(this.HistogramG);
            this.Controls.Add(this.HistogramR);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.OriginalPic);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.PrewittCheck);
            this.Controls.Add(this.GaussCheck);
            this.Controls.Add(this.LaplaceCheck);
            this.Controls.Add(this.RepujadoCheck);
            this.Controls.Add(this.SobelCheck);
            this.Controls.Add(this.FilePath);
            this.Controls.Add(this.Cargar);
            this.Controls.Add(this.ResultPic);
            this.Name = "Form1";
            this.Text = "Principal";
            ((System.ComponentModel.ISupportInitialize)(this.ResultPic)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.OriginalPic)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox ResultPic;
        private System.Windows.Forms.Button Cargar;
        private System.Windows.Forms.Label FilePath;
        private System.Windows.Forms.CheckBox SobelCheck;
        private System.Windows.Forms.CheckBox RepujadoCheck;
        private System.Windows.Forms.CheckBox LaplaceCheck;
        private System.Windows.Forms.CheckBox GaussCheck;
        private System.Windows.Forms.CheckBox PrewittCheck;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox OriginalPic;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private AForge.Controls.Histogram HistogramR;
        private AForge.Controls.Histogram HistogramG;
        private AForge.Controls.Histogram HistogramB;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.TextBox inputFileName;
        private System.Windows.Forms.Button btnVideo;
    }
}


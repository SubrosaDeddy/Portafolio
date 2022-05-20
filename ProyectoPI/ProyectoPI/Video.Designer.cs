
namespace ProyectoPI
{
    partial class Video
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
            this.videoPicBox = new AForge.Controls.PictureBox();
            this.btnLoad = new System.Windows.Forms.Button();
            this.trackRed = new System.Windows.Forms.TrackBar();
            this.trackGreen = new System.Windows.Forms.TrackBar();
            this.trackBlue = new System.Windows.Forms.TrackBar();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.btnPolaroid = new System.Windows.Forms.Button();
            this.btnSwap = new System.Windows.Forms.Button();
            this.btnInvert = new System.Windows.Forms.Button();
            this.btnRGB = new System.Windows.Forms.Button();
            this.btnFilter = new System.Windows.Forms.Button();
            this.btnPlay = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.videoPicBox)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackRed)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackGreen)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBlue)).BeginInit();
            this.SuspendLayout();
            // 
            // videoPicBox
            // 
            this.videoPicBox.BackColor = System.Drawing.SystemColors.InactiveCaption;
            this.videoPicBox.Image = null;
            this.videoPicBox.Location = new System.Drawing.Point(12, 12);
            this.videoPicBox.Name = "videoPicBox";
            this.videoPicBox.Size = new System.Drawing.Size(939, 570);
            this.videoPicBox.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.videoPicBox.TabIndex = 10;
            this.videoPicBox.TabStop = false;
            // 
            // btnLoad
            // 
            this.btnLoad.Location = new System.Drawing.Point(957, 12);
            this.btnLoad.Name = "btnLoad";
            this.btnLoad.Size = new System.Drawing.Size(75, 23);
            this.btnLoad.TabIndex = 11;
            this.btnLoad.Text = "Cargar";
            this.btnLoad.UseVisualStyleBackColor = true;
            this.btnLoad.Click += new System.EventHandler(this.btnLoad_Click);
            // 
            // trackRed
            // 
            this.trackRed.Location = new System.Drawing.Point(957, 68);
            this.trackRed.Name = "trackRed";
            this.trackRed.Size = new System.Drawing.Size(104, 45);
            this.trackRed.TabIndex = 12;
            this.trackRed.Visible = false;
            // 
            // trackGreen
            // 
            this.trackGreen.Location = new System.Drawing.Point(957, 119);
            this.trackGreen.Name = "trackGreen";
            this.trackGreen.Size = new System.Drawing.Size(104, 45);
            this.trackGreen.TabIndex = 13;
            this.trackGreen.Visible = false;
            // 
            // trackBlue
            // 
            this.trackBlue.Location = new System.Drawing.Point(957, 183);
            this.trackBlue.Name = "trackBlue";
            this.trackBlue.Size = new System.Drawing.Size(104, 45);
            this.trackBlue.TabIndex = 14;
            this.trackBlue.Visible = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(957, 52);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(27, 13);
            this.label1.TabIndex = 15;
            this.label1.Text = "Red";
            this.label1.Visible = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(954, 100);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(36, 13);
            this.label2.TabIndex = 16;
            this.label2.Text = "Green";
            this.label2.Visible = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(954, 167);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(28, 13);
            this.label3.TabIndex = 17;
            this.label3.Text = "Blue";
            this.label3.Visible = false;
            // 
            // btnPolaroid
            // 
            this.btnPolaroid.Location = new System.Drawing.Point(712, 634);
            this.btnPolaroid.Name = "btnPolaroid";
            this.btnPolaroid.Size = new System.Drawing.Size(75, 23);
            this.btnPolaroid.TabIndex = 23;
            this.btnPolaroid.Text = "Polaroid";
            this.btnPolaroid.UseVisualStyleBackColor = true;
            this.btnPolaroid.Click += new System.EventHandler(this.btnPolaroid_Click);
            // 
            // btnSwap
            // 
            this.btnSwap.Location = new System.Drawing.Point(585, 634);
            this.btnSwap.Name = "btnSwap";
            this.btnSwap.Size = new System.Drawing.Size(75, 23);
            this.btnSwap.TabIndex = 22;
            this.btnSwap.Text = "Swap RGB";
            this.btnSwap.UseVisualStyleBackColor = true;
            this.btnSwap.Click += new System.EventHandler(this.btnSwap_Click);
            // 
            // btnInvert
            // 
            this.btnInvert.Location = new System.Drawing.Point(452, 634);
            this.btnInvert.Name = "btnInvert";
            this.btnInvert.Size = new System.Drawing.Size(75, 23);
            this.btnInvert.TabIndex = 21;
            this.btnInvert.Text = "Invert";
            this.btnInvert.UseVisualStyleBackColor = true;
            this.btnInvert.Click += new System.EventHandler(this.btnInvert_Click);
            // 
            // btnRGB
            // 
            this.btnRGB.Location = new System.Drawing.Point(191, 634);
            this.btnRGB.Name = "btnRGB";
            this.btnRGB.Size = new System.Drawing.Size(75, 23);
            this.btnRGB.TabIndex = 20;
            this.btnRGB.Text = "Original";
            this.btnRGB.UseVisualStyleBackColor = true;
            this.btnRGB.Click += new System.EventHandler(this.btnRGB_Click);
            // 
            // btnFilter
            // 
            this.btnFilter.Location = new System.Drawing.Point(315, 634);
            this.btnFilter.Name = "btnFilter";
            this.btnFilter.Size = new System.Drawing.Size(75, 23);
            this.btnFilter.TabIndex = 19;
            this.btnFilter.Text = "Sepia";
            this.btnFilter.UseVisualStyleBackColor = true;
            this.btnFilter.Click += new System.EventHandler(this.btnFilter_Click);
            // 
            // btnPlay
            // 
            this.btnPlay.Location = new System.Drawing.Point(452, 588);
            this.btnPlay.Name = "btnPlay";
            this.btnPlay.Size = new System.Drawing.Size(75, 23);
            this.btnPlay.TabIndex = 18;
            this.btnPlay.Text = "Play";
            this.btnPlay.UseVisualStyleBackColor = true;
            this.btnPlay.Click += new System.EventHandler(this.btnPlay_Click);
            // 
            // Video
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1074, 669);
            this.Controls.Add(this.btnPolaroid);
            this.Controls.Add(this.btnSwap);
            this.Controls.Add(this.btnInvert);
            this.Controls.Add(this.btnRGB);
            this.Controls.Add(this.btnFilter);
            this.Controls.Add(this.btnPlay);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.trackBlue);
            this.Controls.Add(this.trackGreen);
            this.Controls.Add(this.trackRed);
            this.Controls.Add(this.btnLoad);
            this.Controls.Add(this.videoPicBox);
            this.Name = "Video";
            this.Text = "Video";
            ((System.ComponentModel.ISupportInitialize)(this.videoPicBox)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackRed)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackGreen)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBlue)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private AForge.Controls.PictureBox videoPicBox;
        private System.Windows.Forms.Button btnLoad;
        private System.Windows.Forms.TrackBar trackRed;
        private System.Windows.Forms.TrackBar trackGreen;
        private System.Windows.Forms.TrackBar trackBlue;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnPolaroid;
        private System.Windows.Forms.Button btnSwap;
        private System.Windows.Forms.Button btnInvert;
        private System.Windows.Forms.Button btnRGB;
        private System.Windows.Forms.Button btnFilter;
        private System.Windows.Forms.Button btnPlay;
    }
}
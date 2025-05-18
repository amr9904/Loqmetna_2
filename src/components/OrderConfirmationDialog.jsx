import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Slide,
  Paper,
  Divider,
  CircularProgress,
  Zoom,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useCart } from "../context/CartContext";

// Slide transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderConfirmationDialog = ({ open, onClose, orderNotes = "" }) => {
  // State for form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Access cart context to get order details
  const { cartItems, getCartTotal } = useCart();
  
  // Constants
  const deepRed = "#982121";
  const restaurantPhone = "+201099903814";
  
  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Reset after closing animation completes
      setTimeout(() => {
        setName("");
        setPhone("");
        setNameError(false);
        setPhoneError(false);
        setIsProcessing(false);
        setIsSuccess(false);
      }, 300);
    }
  }, [open]);
  
  // Calculate order totals
  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length === 0 ? 0 : 20;
  const serviceFee = cartItems.length === 0 ? 0 : 10;
  const total = subtotal + deliveryFee + serviceFee;
  
  // Create order summary text
  const createOrderSummary = () => {
    let summary = "";
    
    cartItems.forEach((item, index) => {
      summary += `${item.quantity}x ${item.title}`;
      
      // Add extras if present
      if (item.selectedExtras && item.selectedExtras.length > 0) {
        const extrasText = item.selectedExtras.map(extra => extra.name).join(", ");
        summary += ` (${extrasText})`;
      }
      
      // Add item note if present
      if (item.note && item.note.trim() !== "") {
        summary += ` - ملاحظة: ${item.note}`;
      }
      
      if (index < cartItems.length - 1) {
        summary += "\n";
      }
    });
    
    return summary;
  };
  
  // Create payment summary text
  const createPaymentSummary = () => {
    return `المجموع الفرعي: ${subtotal.toFixed(2)} ج.م\n` +
           `رسوم التوصيل: ${deliveryFee.toFixed(2)} ج.م\n` +
           `رسوم الخدمة: ${serviceFee.toFixed(2)} ج.م\n` +
           `الإجمالي: ${total.toFixed(2)} ج.م`;
  };
  
  // Validate form and send WhatsApp message
  const handleSubmit = () => {
    // Form validation
    let isValid = true;
    
    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
    
    if (!phone.trim() || !/^[0-9+]{10,15}$/.test(phone.trim())) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }
    
    if (!isValid) return;
    
    // Show processing state
    setIsProcessing(true);
    
    // Create WhatsApp message
    const orderMessage = 
      `*طلب جديد من تطبيق لقمتنا*\n\n` +
      `*اسم العميل:* ${name}\n` +
      `*رقم التليفون:* ${phone}\n\n` +
      `*ملخص الطلب:*\n${createOrderSummary()}\n\n` +
      `*ملخص الدفع:*\n${createPaymentSummary()}`;
    
    // Add order notes if present
    const finalMessage = orderNotes && orderNotes.trim() !== "" 
      ? `${orderMessage}\n\n*ملاحظات إضافية:*\n${orderNotes}`
      : orderMessage;
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Wait to show success state before opening WhatsApp
      setTimeout(() => {
        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappURL = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
        
        // Close the dialog after a short delay
        setTimeout(() => {
          onClose();
        }, 500);
      }, 800);
    }, 1000);
  };
  
  // Success content
  const SuccessContent = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Zoom in={isSuccess}>
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: '#4caf50', 
            mb: 2 
          }} 
        />
      </Zoom>
      <Fade in={isSuccess} timeout={800}>
        <Typography 
          variant="h6" 
          fontWeight={700} 
          sx={{ mb: 1 }}
        >
          تم تحضير الطلب بنجاح!
        </Typography>
      </Fade>
      <Fade in={isSuccess} timeout={1000}>
        <Typography 
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          جاري فتح واتساب لإرسال الطلب...
        </Typography>
      </Fade>
      <Fade in={isSuccess} timeout={1200}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          color: '#25D366',
          bgcolor: 'rgba(37, 211, 102, 0.1)',
          px: 2,
          py: 1,
          borderRadius: 2
        }}>
          <WhatsAppIcon sx={{ mr: 1 }} />
          <Typography fontWeight={500}>+201099903814</Typography>
        </Box>
      </Fade>
    </Box>
  );
  
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={isProcessing ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          direction: "rtl",
          overflow: "hidden",
          maxHeight: "90vh",
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          margin: { xs: 2, sm: 4 },
        },
        zIndex: 1400,
      }}
    >
      <Box sx={{ position: "relative", bgcolor: "#fafafa" }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: deepRed,
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={700} fontSize={20}>
            {isSuccess ? "تأكيد الطلب" : "إتمام الطلب"}
          </Typography>
          {!isProcessing && !isSuccess && (
            <IconButton
              onClick={onClose}
              sx={{ color: "white", p: 0.5 }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        
        <DialogContent 
          sx={{ 
            p: 3, 
            pb: 11, // Add padding at bottom to accommodate the fixed button
            overflowY: "auto",
            maxHeight: "calc(80vh - 120px)" // Limit height to prevent overflow
          }}
        >
          {isSuccess ? (
            <SuccessContent />
          ) : isProcessing ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4
            }}>
              <CircularProgress 
                sx={{ 
                  color: deepRed, 
                  mb: 2 
                }} 
              />
              <Typography>جاري تحضير الطلب...</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Form fields */}
              <Box sx={{ mb: 4, mt: 1 }}>
                <Typography fontWeight={600} mb={0.5}>
                  ادخل اسمك
                </Typography>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={nameError}
                  helperText={nameError ? "الرجاء إدخال الاسم" : ""}
                  variant="outlined"
                  placeholder="الاسم الكامل"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: deepRed,
                      },
                      '&.Mui-focused': {
                        borderColor: deepRed,
                        boxShadow: `0 0 0 2px rgba(152, 33, 33, 0.2)`,
                      }
                    },
                  }}
                  autoFocus
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography fontWeight={600} mb={0.5}>
                  رقم الموبايل
                </Typography>
                <TextField
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={phoneError}
                  helperText={phoneError ? "الرجاء إدخال رقم هاتف صحيح" : ""}
                  variant="outlined"
                  placeholder="01xxxxxxxxx"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: deepRed,
                      },
                      '&.Mui-focused': {
                        borderColor: deepRed,
                        boxShadow: `0 0 0 2px rgba(152, 33, 33, 0.2)`,
                      }
                    },
                  }}
                />
              </Box>
              
              {/* Order Summary */}
              <Box sx={{ mb: 3 }}>
                <Typography fontWeight={700} fontSize={16} mb={1}>
                  ملخص الطلب
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "#f5f5f5",
                    p: 2,
                    borderRadius: 2,
                    maxHeight: 120,
                    overflow: "auto",
                    border: '1px solid #eee',
                  }}
                >
                  {cartItems.length === 0 ? (
                    <Typography color="text.secondary" fontSize={14}>
                      لا توجد منتجات في السلة
                    </Typography>
                  ) : (
                    <Box>
                      {cartItems.map((item, index) => (
                        <Box key={item.cartItemKey || item.id}>
                          <Typography fontSize={14}>
                            {item.quantity}x {item.title}
                            {item.selectedExtras && item.selectedExtras.length > 0 && (
                              <Typography component="span" fontSize={13} color="text.secondary">
                                {" "}({item.selectedExtras.map(extra => extra.name).join(", ")})
                              </Typography>
                            )}
                          </Typography>
                          {index < cartItems.length - 1 && <Divider sx={{ my: 0.5 }} />}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Box>
              
              {/* Payment Summary */}
              <Box sx={{ mb: 4 }}>
                <Typography fontWeight={700} fontSize={16} mb={1}>
                  ملخص الدفع
                </Typography>
                <Paper 
                  elevation={0}
                  sx={{ 
                    bgcolor: "#f5f5f5", 
                    p: 2, 
                    borderRadius: 2,
                    border: '1px solid #eee',
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography fontSize={14}>المجموع الفرعي:</Typography>
                    <Typography fontSize={14}>{subtotal.toFixed(2)} ج.م</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography fontSize={14}>رسوم التوصيل:</Typography>
                    <Typography fontSize={14}>{deliveryFee.toFixed(2)} ج.م</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography fontSize={14}>رسوم الخدمة:</Typography>
                    <Typography fontSize={14}>{serviceFee.toFixed(2)} ج.م</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight={700} fontSize={15}>الإجمالي:</Typography>
                    <Typography fontWeight={700} fontSize={15} color={deepRed}>{total.toFixed(2)} ج.م</Typography>
                  </Box>
                </Paper>
              </Box>
              
              {/* Notes if available */}
              {orderNotes && orderNotes.trim() !== "" && (
                <Box sx={{ mb: 3 }}>
                  <Typography fontWeight={700} fontSize={16} mb={1}>
                    ملاحظات إضافية
                  </Typography>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      bgcolor: "#f5f5f5", 
                      p: 2, 
                      borderRadius: 2,
                      border: '1px solid #eee',
                    }}
                  >
                    <Typography fontSize={14}>{orderNotes}</Typography>
                  </Paper>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        
        {/* Fixed Button Container */}
        {!isSuccess && !isProcessing && (
          <Box 
            sx={{ 
              position: "fixed", 
              bottom: 0, 
              left: 0, 
              right: 0,
              padding: "16px 24px", 
              bgcolor: "rgba(250,250,250,0.95)", 
              borderTop: "1px solid #eee",
              backdropFilter: "blur(8px)",
              zIndex: 5,
              mx: "auto",
              width: { xs: "calc(100% - 32px)", sm: "550px" },
              maxWidth: "calc(100% - 32px)",
              boxShadow: "0px -2px 10px rgba(0,0,0,0.05)",
              borderRadius: "0 0 16px 16px",
            }}
          >
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: deepRed,
                color: "white",
                borderRadius: 50,
                py: 2,
                fontSize: 17,
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#c11c1c",
                },
                boxShadow: '0 4px 10px rgba(152, 33, 33, 0.3)',
                transition: 'all 0.3s ease',
                "&:active": {
                  transform: 'translateY(2px)',
                  boxShadow: '0 2px 5px rgba(152, 33, 33, 0.3)',
                },
                minHeight: 56,
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(152, 33, 33, 0.4)',
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(152, 33, 33, 0)',
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(152, 33, 33, 0)',
                  },
                },
                animation: 'pulse 2s infinite',
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                "& svg": { mr: 1 }
              }}>
                <WhatsAppIcon />
                <span>تأكيد وإرسال الطلب</span>
              </Box>
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default OrderConfirmationDialog; 
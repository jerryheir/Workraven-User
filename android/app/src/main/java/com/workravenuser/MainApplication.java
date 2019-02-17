package com.workravenuser;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.keychain.KeychainPackage;
import cl.json.RNSharePackage;   
import cl.json.ShareApplication;
import com.arttitude360.reactnative.rnpaystack.RNPaystackPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;                       
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.henninghall.date_picker.DatePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    // @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    // @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new RNGooglePlacesPackage(),
            new DatePickerPackage(),
            new RNFusedLocationPackage(),
            new RNGoogleSigninPackage(),
            new KeychainPackage(),
            new RNSharePackage(),
            new RNPaystackPackage(),
            new MapsPackage(),
            new PickerPackage(),
            new VectorIconsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }

    // @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  // @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  // @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
  }

  // @Override
  public String getFileProviderAuthority() {
    return "com.example.workravenuser.provider";
  }
}
